import type { NextConfig } from "next";

const repo = "E-Learning-Platform---HCI-Usability-Evaluation";

const nextConfig: NextConfig = {
  output: "export",           // Static HTML export for GitHub Pages
  basePath: `/${repo}`,       // Must match your repo name
  assetPrefix: `/${repo}/`,   // So CSS/JS assets load correctly
  images: {
    unoptimized: true,        // GitHub Pages can't run Next.js image optimization
  },
  trailingSlash: true,        // Ensures /dashboard → /dashboard/index.html
};

export default nextConfig;
