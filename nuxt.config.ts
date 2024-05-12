// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  components: true,
  ssr: false,
  modules: [
    '@fullpage/nuxt-fullpage',
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
      runtimeCaching: [
        {
          urlPattern: new RegExp('^/api/operations/.*'), // Regex for flexibility
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'operations-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
            },
            cacheableResponse: {
              statuses: [0, 200], // Cache successful responses
            },
          },
        },
        {
          urlPattern: new RegExp('^/api/tutorial/.*'), // Regex for flexibility
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'tutorials-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
            },
            cacheableResponse: {
              statuses: [0, 200], // Cache successful responses
            },
          },
        },
      ],
      skipWaiting: true, // Update immediately
      clientsClaim: true, // Control clients immediately
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
      scrollTo: true,
    }
  },
})
