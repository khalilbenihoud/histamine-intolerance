import type { NextConfig } from "next";

// Static export for GitHub Pages. Pages serves the site under the repo path
// (https://<user>.github.io/histamine-intolerance), so we set basePath.
const repo = "histamine-intolerance";
const isCI = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isCI ? `/${repo}` : "",
  assetPrefix: isCI ? `/${repo}/` : "",
  trailingSlash: true,
};

export default nextConfig;
