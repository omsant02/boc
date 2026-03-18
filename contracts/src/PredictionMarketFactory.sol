// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PredictionMarket.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PredictionMarketFactory is Ownable {
    
    address[] public allMarkets;
    mapping(address => address[]) public userMarkets; // markets created by user
    
    event MarketCreated(
        address indexed marketAddress,
        address indexed creator,
        string question,
        uint256 endTime
    );
    
    constructor(address _owner) Ownable(_owner) {}
    
    function createMarket(
        string memory _question,
        uint256 _durationInDays
    ) external returns (address) {
        require(_durationInDays > 0 && _durationInDays <= 365, "Invalid duration");
        
        uint256 endTime = block.timestamp + (_durationInDays * 1 days);
        
        PredictionMarket newMarket = new PredictionMarket(
            msg.sender,  // creator is the owner
            msg.sender,  // creator is also oracle (can change later)
            _question,
            endTime
        );
        
        address marketAddress = address(newMarket);
        
        allMarkets.push(marketAddress);
        userMarkets[msg.sender].push(marketAddress);
        
        emit MarketCreated(marketAddress, msg.sender, _question, endTime);
        
        return marketAddress;
    }
    
    function getAllMarkets() external view returns (address[] memory) {
        return allMarkets;
    }
    
    function getUserMarkets(address user) external view returns (address[] memory) {
        return userMarkets[user];
    }
    
    function getMarketCount() external view returns (uint256) {
        return allMarkets.length;
    }
}