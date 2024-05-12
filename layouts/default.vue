<template>  
  <template v-if="!isFullscreen">
    <install></install>
  </template>
  <main :class="{locked: !isFullscreen}">
    <slot />
  </main>
</template>
<script setup>
const device = useDevice()
const isFullscreen = computed(() => {
  if(process.env.NODE_ENV === "development") {
    return false
  } else if (device.isFullscreen) {
    return true
  } else {
    return false
  }
})

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

  &.locked {
    pointer-events: none;
    overflow: hidden;
  }
}
</style>