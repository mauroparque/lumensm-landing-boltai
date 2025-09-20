import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/css/.test(ext)) {
            return 'styles/[name].[ext]';
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'images/[name].[ext]';
          }
          return '[name].[ext]';
        }
      }
    },
    outDir: 'dist',
    assetsDir: '.',
    emptyOutDir: true
  },
  // Removido: plugins: [react()] para vanilla
  optimizeDeps: {
    // Limpiamos dependencias React
  },
});
