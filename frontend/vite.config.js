import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({ registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    manifest: {
      name: 'Fake News Detector',
      short_name: 'fakeNews',
      description: 'An app to detect fake news',
      theme_color: '#000000',
      icons: [
        {
          src: 'pwa-fakenews.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-fakenews192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          "src": "maskable_icon.png",
          "sizes": "196x196",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    }
  }),
  mkcert()
],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
    https: true
  },
})
