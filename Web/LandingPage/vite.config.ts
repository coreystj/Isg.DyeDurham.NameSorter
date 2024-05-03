import path from 'path';
import { copy } from 'vite-plugin-copy'

export default {
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    port: 8080,
    hot: true
  },
  build: {
    outDir: '../dist',
    assetsDir: 'assets' // All built assets will go into 'dist/assets'
  },
  publicDir: 'src/assets', // Change this if your static files are in a folder named 'public'
  plugins: [
    copy([
      { src: './src/assets', dest: 'dist' },
    ]),
    {
      name: 'configure-global-variable',
      config() {
        return {
          define: {
            global: 'window'
          }
        };
      }
    }
  ]
};
