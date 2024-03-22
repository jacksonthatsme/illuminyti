<template>  
  <main>
    <slot />
  </main>
</template>

<style lang="scss" scoped>
main {
  max-width: 500px;
  height: 100dvh;
  margin-right: auto;
  margin-left: auto;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-snap-points-y: repeat(100dvh);
}
</style>