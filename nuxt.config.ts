// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  modules: [
    '@fullpage/nuxt-fullpage',
    'nuxt-swiper',
    '@hypernym/nuxt-gsap',
    '@nuxtjs/device',
  ],
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/main.css',
  ],
})
