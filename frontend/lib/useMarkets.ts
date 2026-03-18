import { useReadContract, useReadContracts } from 'wagmi'
import { FACTORY_ADDRESS, FactoryABI, MarketABI } from './contracts'

export function useAllMarkets() {
  return useReadContract({
    address: FACTORY_ADDRESS,
    abi: FactoryABI,
    functionName: 'getAllMarkets',
  })
}

export function useMarketInfo(marketAddress: `0x${string}`) {
  return useReadContract({
    address: marketAddress,
    abi: MarketABI,
    functionName: 'getMarketInfo',
  })
}

export function useMarketOdds(marketAddress: `0x${string}`) {
  return useReadContract({
    address: marketAddress,
    abi: MarketABI,
    functionName: 'getCurrentOdds',
  })
}
