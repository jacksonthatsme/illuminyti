export default defineNuxtPlugin(nuxtApp => {
  
  if (process.client) {
    nuxtApp.$device.isInstalled = window.matchMedia('(display-mode: standalone)').matches
  }
})