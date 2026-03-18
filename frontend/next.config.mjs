/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'porto/internal': false,
      '@base-org/account': false,
      '@coinbase/wallet-sdk': false,
      '@metamask/sdk': false,
      '@safe-global/safe-apps-sdk': false,
      '@safe-global/safe-apps-provider': false,
      '@walletconnect/ethereum-provider': false,
    }
    return config
  },
}

export default nextConfig
