import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/produtos.html', destination: '/produtos', permanent: true },
      { source: '/sobre-nos.html', destination: '/', permanent: true },
      { source: '/quem-somos.html', destination: '/', permanent: true },
      { source: '/sinistro.html', destination: '/sinistro', permanent: true },
      { source: '/contato.html', destination: '/cotacao', permanent: true },
    ];
  },
};

export default nextConfig;
