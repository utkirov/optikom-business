// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/icon'
  ],
  site: {
    url: 'https://optikom.biz',
    name: 'Optikom Business',
    description: 'Управляемые IT и телеком услуги в Узбекистане',
    defaultLocale: 'ru',
  },
  experimental: {
    appManifest: false
  },
//   seo: {
//     fallbackTitle: 'Optikom Business — IT для Вашего Бизнеса',
//   },
  ogImage: {
    enabled: false as any,
  },
//   sitemap: {
//     hostname: 'https://optikom.biz' as any
//   },
  i18n: {
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'uz', name: 'O\'zbekcha', file: 'uz.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    langDir: '../i18n/locales/'
  },
  build: {
    transpile: []
  },
  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600, 700, 800],
      Orbitron: [700],
      Outfit: [300, 400, 500, 600, 700, 800, 900]
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
    },
    serverAssets: [
      {
        baseName: 'fonts',
        dir: './server/assets/fonts'
      }
    ]
  },
  runtimeConfig: {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || '',
    adminPassword: process.env.ADMIN_PASSWORD || '123456',
    jwtSecret: process.env.JWT_SECRET || 'super-secret-key-for-optikom',
  }
})

