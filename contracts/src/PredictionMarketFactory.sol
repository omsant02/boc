// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PredictionMarket.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PredictionMarketFactory is Ownable {
    
    address[] public allMarkets;
    mapping(address => address[]) public userMarkets;
    
    event MarketCreated(
        address indexed marketAddress,
        address indexed creator,
        string question,
        uint256 endTime
    );
    
    constructor(address _owner) Ownable(_owner) {}
    
    function createMarket(
        string memory _question,
        uint256 _durationInMinutes  // CHANGED from days to minutes
    ) external returns (address) {
        require(_durationInMinutes > 0 && _durationInMinutes <= 525600, "Invalid duration"); // max 1 year
        
        uint256 endTime = block.timestamp + (_durationInMinutes * 1 minutes); // CHANGED
        
        PredictionMarket newMarket = new PredictionMarket(
            msg.sender,
            msg.sender,
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