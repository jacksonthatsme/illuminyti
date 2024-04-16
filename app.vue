<template>
  <VitePwaManifest />
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const device = useDevice()
import { computed } from 'vue';
// You might choose this based on an API call or logged-in status
const layout = computed(() => {
  if(process.env.NODE_ENV === "development") {
    return 'install'
  } else if (device.isInstalled) {
    return 'default'
  } else {
    return 'default'
  }
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes'},
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
    { name: 'theme-color', content: '#000000'}
  ]
})
</script>