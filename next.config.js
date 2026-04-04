/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle ESM modules properly
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.mjs': ['.mjs', '.js', '.ts', '.tsx'],
    }
    
    // Fix for viem and other ESM packages
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    })
    
    // Handle import.meta for viem
    if (!isServer) {
      config.plugins.push(
        new (require('webpack')).NormalModuleReplacementPlugin(
          /^viem$/,
          (resource) => {
            resource.request = resource.request.replace(/viem/, 'viem/_esm')
          }
        )
      )
    }
    
    return config
  },
  
  // Transpile these packages
    transpilePackages: [
      '@coinbase/wallet-sdk',
      '@rainbow-me/rainbowkit',
      'wagmi',
      '@wagmi/connectors',
      'viem',
    ],
    experimental: {
      esmExternals: 'loose',  // ← key fix for Next 13 + ESM packages
    },
  }
module.exports = nextConfig