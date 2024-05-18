// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  components: true,
  modules: [
    'nuxt-swiper',
    '@hypernym/nuxt-gsap',
    '@nuxtjs/device',
    '@vite-pwa/nuxt',
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/main.css',
  ],
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['/icons/favicon.ico', '/icons/apple-touch-icon.png'],
    manifest: {
      name: 'Illuminyti',
      short_name: 'Illuminyti',
      theme_color: '#000000',
      display: 'fullscreen',
      start_url: '/',
      icons: [
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,md}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  plugins: [
    { src: '~/plugins/checkDisplayMode.js'},
    { src: '~/plugins/event-bus.js'},
  ],
  content: {
    markdown: {
      anchorLinks: false
    }
  },
  gsap: {
    extraPlugins: {
      text: true,
      scrollTrigger: true,
      scrollTo: true
    }
  }
})
