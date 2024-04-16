<template>
  <VitePwaManifest />
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useDevice } from '@nuxtjs/device'; // Assuming you're using Nuxt Device Module
import { useContent } from '@nuxt/content'; // Assuming you're using Nuxt Content Module

const device = useDevice();
const contentLoaded = ref(false); // State to manage content load status

// Define the layout based on environment, device, and content load status
const layout = computed(() => {
  if (process.env.NODE_ENV === "development" || device.isInstalled || contentLoaded.value) {
    return 'default';
  } else {
    return 'install';
  }
});

// Function to fetch and process your content
async function fetchContent() {
  const content = await useContent().fetch('your-content-path');
  console.log('Content fetched:', content);
  // Process and cache content as necessary here
  contentLoaded.value = true; // Set content as loaded
}

// Using onMounted to fetch content when the component mounts
onMounted(() => {
  if (!device.isInstalled) {
    fetchContent(); // Fetch content if not installed as a PWA
  }
});

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes'},
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
    { name: 'theme-color', content: '#000000'}
  ]
});
</script>
