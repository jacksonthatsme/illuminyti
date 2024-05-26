<template>
  <div class="notFoundContainer">
    <div class="spriteContainer" ref="spriteContainer"></div>
    <h1>Rendezvous not found.<br/>Adjust your location and try again</h1>
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
    $gsap.to(spriteContainer.value, 1.4, {
      backgroundPosition: ((spriteContainer.value.offsetWidth * 24)*-1) + "px center",
      ease: "steps(24)"
    });
  }
});
</script>

<style lang="scss" scoped>

.notFoundContainer {
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
  padding: 20px;
  gap: 20px;


  .spriteContainer {
    max-height: 180px;
    height: auto;
    display: block;
    flex: 1;
    aspect-ratio: 11/16;
    margin-bottom: 10px;
    height: 0;
    background-image: url('/images/screen/location-not-found-sprite.png');
    background-size: cover;
    background-position: 0px;
    background-repeat: no-repeat;
  }
  h1 {
    margin: 0; 
    font-family: 'Eurostile';
    line-height: 1.5;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
  }
}
</style>