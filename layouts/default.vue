<template>  
  <main>
    <slot />
  </main>
</template>

<style lang="scss" scoped>
main {
  max-width: 500px;
  height: 100vh;
  margin-right: auto;
  margin-left: auto;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-snap-points-y: repeat(100dvh);
}
</style>