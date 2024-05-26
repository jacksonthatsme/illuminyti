<template>
  <div class="locationFoundContainer">
    <div class="spriteContainer" ref="spriteContainer"></div>
    <div>
      <h2>Rendezvous Point</h2>
      <h1>{{activeOperation.name}}</h1>
      <h2>Found</h2>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, nextTick } from 'vue';

const props = defineProps({
  activeOperation: {
    type: Object,
    required: true,
    default: { name: 'Operation Name' }
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
.locationFoundContainer {
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
    background-image: url('/images/screen/location-found-sprite.png');
    background-size: cover;
    background-position: left center;
    background-repeat: no-repeat;
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
    line-height: 1.5;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    font-size: 24px;
  }
}
</style>