import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'static-assets-server',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (
              req.url === '/robots.txt' ||
              req.url === '/robot.txt' ||
              req.url === '/roboots.txt' ||
              req.url === '/llms.txt'
            ) {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              const targetFile = req.url === '/llms.txt' ? 'public/llms.txt' : 'public/robots.txt';
              const filePath = path.resolve(__dirname, targetFile);
              if (fs.existsSync(filePath)) {
                res.end(fs.readFileSync(filePath, 'utf-8'));
                return;
              }
            }
            if (req.url === '/sitemap.xml') {
              res.setHeader('Content-Type', 'application/xml; charset=utf-8');
              const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
              if (fs.existsSync(sitemapPath)) {
                res.end(fs.readFileSync(sitemapPath, 'utf-8'));
                return;
              }
            }
            if (req.url === '/favicon.svg' || req.url === '/logo.svg') {
              res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
              const svgPath = path.resolve(__dirname, `public${req.url}`);
              if (fs.existsSync(svgPath)) {
                res.end(fs.readFileSync(svgPath, 'utf-8'));
                return;
              }
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
