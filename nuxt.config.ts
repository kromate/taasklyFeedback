import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'
import app from './app_config'

export default {
  ssr: true,
  devtools: { enabled: false },
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss'],

  dir: {
    layouts: './src/layouts',
    pages: './src/pages',
    middleware: './src/middlewares'
  },
  components: [
    '@/components',
    { path: '@/components/core', extensions: ['vue'] }
  ],
  plugins: ['@/plugins/analytics.ts'],
    css: ['@/assets/css/main.css'],
  alias: {
    '@': './src'
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
       connectSrc: false
      }
    }
  },
  vite: {

    plugins: [
      eslintPlugin({ useEslintrc: true, exclude: ['**/node_modules/**'] })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  },
  app
}
