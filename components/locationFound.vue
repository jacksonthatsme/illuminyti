<template>
  <div class="deadDropContainer" v-if="isDeadDrop" >
      <div class="deadDropSpriteContainer" ref="deadDropSpriteContainer"></div>
  </div>
  <div class="locationFoundContainer" v-else>
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

//computed property that checks for a specific id in the active operation
const isDeadDrop = computed(() => {
  if (props.activeOperation.id == 'l-t-c' || props.activeOperation.id == 't-l-r') {
    return true;
  } else {
    return false;
  }
});


const { $gsap } = useNuxtApp();
const spriteContainer = ref(null);
const deadDropSpriteContainer = ref(null);

onMounted(async () => {
  await nextTick();
  if (spriteContainer.value) {
    console.log('Child component is mounted');
    $gsap.to(spriteContainer.value, 1.1, {
      backgroundPosition: ((spriteContainer.value.offsetWidth * 20)*-1) + "px center",
      ease: "steps(20)"
    });
  }
  if (deadDropSpriteContainer.value) {
    console.log('Child component is mounted');
    $gsap.to(deadDropSpriteContainer.value, 2.8, {
      backgroundPosition: ((deadDropSpriteContainer.value.offsetWidth * 40)*-1) + "px center",
      ease: "steps(40)"
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
    line-height: 1.1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    font-size: 24px;
  }
}
.deadDropContainer {
  height: 100%;
  width: 100%;
  color: #5E5940;
  mix-blend-mode: multiply;
  filter: blur(.1px) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3));
}
.deadDropSpriteContainer {
  max-height: 100%;
  height: 100%;
  width: auto;
  display: block;
  aspect-ratio: 1/1;
  background-image: url('/images/screen/dead-drop-sprite.png');
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
}
</style>