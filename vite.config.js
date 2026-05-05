import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/balashiha-test/',
  plugins: [tailwindcss()],
});
