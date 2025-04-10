import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Support Markdown features even after esbuild transforms
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  // Support loading images from local machine
  images: {
    domains: ['localhost', 'via.placeholder.com'],
  },
}

// Configure MDX to handle .md and .mdx files
const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
