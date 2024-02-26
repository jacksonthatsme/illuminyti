// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  modules: [
    '@fullpage/nuxt-fullpage',
    'nuxt-swiper',
    '@hypernym/nuxt-gsap',
    '@nuxtjs/device',
    '@vite-pwa/nuxt',
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
      start_url: '/?fullscreen=true',
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
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
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
    { src: '~/plugins/isInstalled.js'},
  ],
})
