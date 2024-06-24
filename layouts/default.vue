<template>
  <ClientOnly>
    <install v-if="!isFullscreen"></install>  
    <main v-if="isFullscreen" :class="{'scroll-lock': isScrollLocked}">
      <slot />
    </main>
  </ClientOnly>
</template>
<script setup>
import { useTutorialStatus } from '~/stores/tutorialStatusStore';
const tutorialStatus = useTutorialStatus();
const device = useDevice()
const { $event } = useNuxtApp()
const isFullscreen = computed(() => {
  if(process.env.NODE_ENV === "development") {
    return true
  } else if (device.isFullscreen) {
    return true
  } else {
    return false
  }
})
const isScrollLocked = computed(() => {
  return !tutorialStatus.tutorialCompleted;
});

watch(
  () => tutorialStatus.tutorialCompleted,
  (newVal) => {
    console.log('Tutorial completion status:', newVal);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
main {
  max-width: 500px;
  width: 100%;
  height: 100dvh;
  margin-right: auto;
  margin-left: auto;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  &.scroll-lock {
    overflow: hidden;
    scroll-snap-type: none;
  }
}
</style>