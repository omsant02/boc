// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/PredictionMarketFactory.sol";
import "../src/PredictionMarket.sol";

contract DeployScript is Script {
    function run() external {
        // Use the private key passed via command line, not from .env
        uint256 deployerPrivateKey = vm.envOr("DEPLOYER_KEY", uint256(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80));
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying with address:", deployer);
        console.log("Balance:", deployer.balance);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy Factory
        PredictionMarketFactory factory = new PredictionMarketFactory(deployer);
        console.log("\nFactory deployed at:", address(factory));
        
        // Create first market
        address firstMarket = factory.createMarket(
            "Will Dhurandhar 2 hit Rs.100cr Day 1?",
            7 // 7 days
        );
        console.log("First market created at:", firstMarket);
        
        vm.stopBroadcast();
        
        console.log("\n=== DEPLOYMENT COMPLETE ===");
        console.log("Factory:", address(factory));
        console.log("First Market:", firstMarket);
    }
}
