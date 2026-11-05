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
        name: 'robots-txt-server',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/robots.txt' || req.url === '/robot.txt') {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              const robotsPath = path.resolve(__dirname, 'public/robots.txt');
              if (fs.existsSync(robotsPath)) {
                res.end(fs.readFileSync(robotsPath, 'utf-8'));
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
