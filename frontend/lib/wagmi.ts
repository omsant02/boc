import { createConfig, http } from 'wagmi'
import { localhost, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// Custom localhost chain config for Anvil
const anvil = {
  ...localhost,
  id: 31337,
  name: 'Anvil',
  rpcUrls: {
    default: {
      http: ['http://localhost:8545'],
    },
    public: {
      http: ['http://localhost:8545'],
    },
  },
}

export const config = createConfig({
  chains: [anvil, sepolia],
  connectors: [injected()],
  transports: {
    [anvil.id]: http(),
    [sepolia.id]: http(),
  },
})
