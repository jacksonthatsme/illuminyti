<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const device = useDevice()
import { computed } from 'vue';
// You might choose this based on an API call or logged-in status
// const layout = computed(() => {
//   if(process.env.NODE_ENV === "development") {
//     return 'default'
//   } else if (device.isInstalled) {
//     return 'default'
//   } else {
//     return 'default'
//   }
// })

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes'},
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
    { name: 'theme-color', content: '#000000'}
  ]
})

// import { useOperationsStore } from '@/stores/operationsStore';
// import { useInstructionsStore } from '@/stores/instructionsStore';

// const operationsStore = useOperationsStore();
// const instructionStore = useInstructionsStore();

// onMounted(async () => {
//   console.log("Fetching data...");
//   await operationsStore.fetchOperations();
//   console.log("Data fetched:", operationsStore.operations);
//   await instructionStore.fetchInstructions();
//   console.log("Data fetched:", instructionStore.instructions);
// });
import { useOperationsStore } from '@/stores/operationsStore';
import { useInstructionsStore } from '@/stores/instructionsStore';

const operationsStore = useOperationsStore();
const instructionsStore = useInstructionsStore();

const { data: operationsData } = await useAsyncData('operations', () =>
  queryContent('operations').find()
);
const { data: instructionsData } = await useAsyncData('instructions', () =>
  queryContent('instructions').find()
);

// Populate stores
operationsStore.operations.value = operationsData.value || [];
instructionsStore.instructions.value = instructionsData.value || [];

</script>