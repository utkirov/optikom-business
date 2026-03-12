// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600, 700, 800],
      Orbitron: [700]
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'author', content: 'Optikom Business' },
        { name: 'theme-color', content: '#060813' },
        { property: 'og:site_name', content: 'Optikom Business' },
        { property: 'og:locale', content: 'ru_RU' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ]
    }
  },
  nitro: {
    storage: {
      db: {
        driver: 'fs',
        base: './.data/db'
      }
    }
  },
  runtimeConfig: {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || '',
    adminPassword: process.env.ADMIN_PASSWORD || '123456',
    jwtSecret: process.env.JWT_SECRET || 'super-secret-key-for-optikom',
  }
})

