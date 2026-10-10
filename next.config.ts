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
  // Bake the base path into every client bundle at build time.
  // NEXT_PUBLIC_* vars are inlined by the compiler — no runtime look-up needed.
  env: {
    NEXT_PUBLIC_BASE_PATH: `/${repo}`,
  },
};

export default nextConfig;
