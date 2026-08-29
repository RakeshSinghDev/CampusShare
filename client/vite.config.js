import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = process.env.VITE_API_URL || process.env.VITE_API_BASE_URL || env.VITE_API_URL || env.VITE_API_BASE_URL;

  return {
    plugins: [react()],
    ...(apiUrl ? {
      define: {
        'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
        'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiUrl),
      },
    } : {}),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
