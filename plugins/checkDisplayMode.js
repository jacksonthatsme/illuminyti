export default defineNuxtPlugin(nuxtApp => {
  
  if (process.client) {
    nuxtApp.$device.isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches
  }
})