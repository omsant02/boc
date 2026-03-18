// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/PredictionMarketFactory.sol";
import "../src/PredictionMarket.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying with address:", deployer);
        console.log("Balance:", deployer.balance);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy Factory
        PredictionMarketFactory factory = new PredictionMarketFactory(deployer);
        console.log("\nFactory deployed at:", address(factory));
        
        // Optionally create a test market
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