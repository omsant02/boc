// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PredictionMarket is Ownable, ReentrancyGuard {
    
    string public question;
    uint256 public marketEndTime;
    address public oracle;
    uint256 public constant PLATFORM_FEE_PERCENT = 5;
    
    enum Outcome { NONE, YES, NO }
    Outcome public result;
    bool public isSettled;
    bool public feesWithdrawn;
    
    mapping(address => uint256) public yesBets;
    mapping(address => uint256) public noBets;
    
    uint256 public totalYesBets;
    uint256 public totalNoBets;
    uint256 public totalFees;
    
    mapping(address => bool) public hasClaimed;
    
    event BetPlaced(address indexed user, bool isYes, uint256 amount, uint256 fee);
    event MarketSettled(Outcome result, uint256 timestamp);
    event WinningsClaimed(address indexed user, uint256 amount);
    event FeesWithdrawn(address indexed owner, uint256 amount);
    
    error MarketEnded();
    error MarketAlreadySettled();
    error InvalidBetAmount();
    error NotOracle();
    error InvalidOutcome();
    error AlreadyClaimed();
    error NotAWinner();
    error TransferFailed();
    error MarketNotSettled();
    error FeesAlreadyWithdrawn();
    error NoWinningBets();
    
    constructor(
        address _owner,
        address _oracle,
        string memory _question,
        uint256 _marketEndTime
    ) Ownable(_owner) {
        require(_marketEndTime > block.timestamp, "Invalid end time");
        require(_oracle != address(0), "Invalid oracle");
        
        oracle = _oracle;
        question = _question;
        marketEndTime = _marketEndTime;
    }
    
    function betYES() external payable nonReentrant {
        if (block.timestamp >= marketEndTime) revert MarketEnded();
        if (isSettled) revert MarketAlreadySettled();
        if (msg.value == 0) revert InvalidBetAmount();
        
        uint256 fee = (msg.value * PLATFORM_FEE_PERCENT) / 100;
        uint256 betAmount = msg.value - fee;
        
        yesBets[msg.sender] += betAmount;
        totalYesBets += betAmount;
        totalFees += fee;
        
        emit BetPlaced(msg.sender, true, betAmount, fee);
    }
    
    function betNO() external payable nonReentrant {
        if (block.timestamp >= marketEndTime) revert MarketEnded();
        if (isSettled) revert MarketAlreadySettled();
        if (msg.value == 0) revert InvalidBetAmount();
        
        uint256 fee = (msg.value * PLATFORM_FEE_PERCENT) / 100;
        uint256 betAmount = msg.value - fee;
        
        noBets[msg.sender] += betAmount;
        totalNoBets += betAmount;
        totalFees += fee;
        
        emit BetPlaced(msg.sender, false, betAmount, fee);
    }
    
    function settleMarket(Outcome _result) external {
        if (msg.sender != oracle) revert NotOracle();
        if (block.timestamp < marketEndTime) revert MarketEnded();
        if (isSettled) revert MarketAlreadySettled();
        if (_result != Outcome.YES && _result != Outcome.NO) revert InvalidOutcome();
        
        result = _result;
        isSettled = true;
        
        emit MarketSettled(_result, block.timestamp);
    }
    
    function claimWinnings() external nonReentrant {
        if (!isSettled) revert MarketNotSettled();
        if (hasClaimed[msg.sender]) revert AlreadyClaimed();
        
        uint256 userBet;
        uint256 totalWinningBets;
        
        if (result == Outcome.YES) {
            userBet = yesBets[msg.sender];
            totalWinningBets = totalYesBets;
        } else {
            userBet = noBets[msg.sender];
            totalWinningBets = totalNoBets;
        }
        
        if (userBet == 0) revert NotAWinner();
        
        // Prevent division by zero - if no one won, only owner can withdraw
        if (totalWinningBets == 0) revert NoWinningBets();
        
        uint256 totalPrizePool = totalYesBets + totalNoBets;
        uint256 payout = (userBet * totalPrizePool) / totalWinningBets;
        
        hasClaimed[msg.sender] = true;
        
        (bool success, ) = payable(msg.sender).call{value: payout}("");
        if (!success) revert TransferFailed();
        
        emit WinningsClaimed(msg.sender, payout);
    }
    
    function withdrawFees() external onlyOwner nonReentrant {
        if (!isSettled) revert MarketNotSettled();
        if (feesWithdrawn) revert FeesAlreadyWithdrawn();
        
        feesWithdrawn = true;
        
        uint256 totalWinningBets = result == Outcome.YES ? totalYesBets : totalNoBets;
        
        uint256 amountToWithdraw;
        if (totalWinningBets == 0) {
            // No winners - owner gets entire pool!
            amountToWithdraw = totalYesBets + totalNoBets + totalFees;
        } else {
            // Normal case - owner gets just the fees
            amountToWithdraw = totalFees;
        }
        
        (bool success, ) = payable(owner()).call{value: amountToWithdraw}("");
        if (!success) revert TransferFailed();
        
        emit FeesWithdrawn(owner(), amountToWithdraw);
    }
    
    function getMarketInfo() external view returns (
        string memory,
        uint256,
        uint256,
        uint256,
        uint256,
        bool,
        Outcome
    ) {
        return (question, marketEndTime, totalYesBets, totalNoBets, totalFees, isSettled, result);
    }
    
    function getCurrentOdds() external view returns (uint256 yesOdds, uint256 noOdds) {
        uint256 total = totalYesBets + totalNoBets;
        if (total == 0) return (50, 50);
        
        yesOdds = (totalYesBets * 100) / total;
        noOdds = (totalNoBets * 100) / total;
    }
}