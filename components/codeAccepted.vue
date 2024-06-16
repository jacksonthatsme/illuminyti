<template>
  <div class="container">
    <h2>Code Accepted</h2>
    <div class="spriteContainer" ref="spriteContainer"></div>
    <h2>+4 points</h2>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { useNuxtApp } from '#app';

const props = defineProps({
  operations: {
    type: Array,
    required: true
  }
});

const { $gsap } = useNuxtApp();
const spriteContainer = ref(null);

onMounted(async () => {
  await nextTick();
  if (spriteContainer.value) {
    console.log('Child component is mounted');
    $gsap.to(spriteContainer.value, 1, {
      backgroundPosition: ((spriteContainer.value.offsetWidth * 20)*-1) + "px center",
      ease: "steps(20)"
    });
  }
});
</script>
<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-family: 'Offbit';
  color: #5E5940;
  mix-blend-mode: multiply;
  filter: blur(.1px) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3));
  padding-left: 20px;
  padding-right: 20px;

  & img {
    height: 80px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  h2 {
    font-family: 'Eurostile';
    line-height: 1.5;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    font-size: 16px;
  }
  h1 {
    font-family: 'Eurostile';
    line-height: 1.1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    font-size: 36px;
  }
  .spriteContainer {
    max-height: 180px;
    height: auto;
    display: block;
    flex: 1;
    aspect-ratio: 27/20;
    margin-bottom: 10px;
    height: 0;
    background-image: url('/images/screen/plus-four-sprite.png');
    background-size: cover;
    background-position: 0px;
    background-repeat: no-repeat;
  }
}
</style>