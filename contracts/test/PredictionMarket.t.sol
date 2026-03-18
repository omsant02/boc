// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/PredictionMarket.sol";

contract PredictionMarketTest is Test {
    PredictionMarket public market;
    address public owner = address(1);
    address public oracle = address(2);
    address public user1 = address(3);
    address public user2 = address(4);
    
    uint256 constant MARKET_DURATION = 7 days;
    
    function setUp() public {
        vm.deal(user1, 100 ether);
        vm.deal(user2, 100 ether);
        
        vm.prank(owner);
        market = new PredictionMarket(
            owner,
            oracle,
            "Will Dhurandhar 2 hit Rs.100cr Day 1?",
            block.timestamp + MARKET_DURATION
        );
    }
    
    function testBetting() public {
        // User 1 bets YES
        vm.prank(user1);
        market.betYES{value: 1 ether}();
        
        assertEq(market.yesBets(user1), 0.95 ether); // 5% fee deducted
        assertEq(market.totalYesBets(), 0.95 ether);
        assertEq(market.totalFees(), 0.05 ether);
        
        // User 2 bets NO
        vm.prank(user2);
        market.betNO{value: 2 ether}();
        
        assertEq(market.noBets(user2), 1.9 ether);
        assertEq(market.totalNoBets(), 1.9 ether);
        assertEq(market.totalFees(), 0.15 ether);
    }
    
    function testSettleAndClaim() public {
        // Place bets
        vm.prank(user1);
        market.betYES{value: 1 ether}();
        
        vm.prank(user2);
        market.betNO{value: 1 ether}();
        
        // Fast forward past end time
        vm.warp(block.timestamp + MARKET_DURATION + 1);
        
        // Oracle settles - YES wins
        vm.prank(oracle);
        market.settleMarket(PredictionMarket.Outcome.YES);
        
        assertTrue(market.isSettled());
        
        // User 1 claims (winner)
        uint256 balanceBefore = user1.balance;
        vm.prank(user1);
        market.claimWinnings();
        
        uint256 balanceAfter = user1.balance;
        assertEq(balanceAfter - balanceBefore, 1.9 ether); // Gets entire pool
        
        // User 2 cannot claim (loser)
        vm.prank(user2);
        vm.expectRevert(PredictionMarket.NotAWinner.selector);
        market.claimWinnings();
    }
    
    function testOwnerWithdrawFees() public {
        // Place bets
        vm.prank(user1);
        market.betYES{value: 1 ether}();
        
        // Settle market
        vm.warp(block.timestamp + MARKET_DURATION + 1);
        vm.prank(oracle);
        market.settleMarket(PredictionMarket.Outcome.YES);
        
        // Owner withdraws fees
        uint256 ownerBalanceBefore = owner.balance;
        vm.prank(owner);
        market.withdrawFees();
        
        uint256 ownerBalanceAfter = owner.balance;
        assertEq(ownerBalanceAfter - ownerBalanceBefore, 0.05 ether);
    }
}