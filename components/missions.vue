<template>
  <div class="edge" @click="addSlide">
    <div class="printSlotOuter">
      <div class="printSlotInner"></div>
    </div>
  </div>
  <div class="container">
    <Swiper 
      @swiper="getSwiperRef"
      class="missionsWrapper"
      :slides-per-view="1"
      :modules="[SwiperEffectCards]"
      :effect="'cards'"
      >
      <SwiperSlide v-for="index in slides" :key="index" :ref="setSlideRef(index)" class="missionSlide">
        <div>{{ index }}</div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
  import { ref, reactive, watch, nextTick } from 'vue';
  const swiper = ref(null)
  const { $gsap } = useNuxtApp()
  function getSwiperRef (swiperInstance) {
    swiper.value = swiperInstance
  }

  const slides = reactive([]);
  const slideRefs = ref(slides.map(() => ref(null))); // Initialize with null refs for each slide

  watchEffect(() => {
    console.log('Slides or slideRefs changed:', slideRefs.value);
    const newSlidesLength = slides.length;
    const oldSlidesLength = slideRefs.value.length;

      // A new slide was added
      const newSlideIndex = newSlidesLength;
      console.log(newSlideIndex)
      nextTick(() => {
        const latestSlideRef = slideRefs.value[newSlideIndex];
        if (latestSlideRef) {
          console.log(latestSlideRef)
          $gsap.from(latestSlideRef.$el, {
            duration: 1,
            y: '-800px',
          });
        } else {
          console.log('New slide ref not found or not rendered yet');
        }
      });
  });

  const setSlideRef = index => el => {
    slideRefs.value[index] = el;
  };

  const addSlide = () => {
    slides.unshift(slides.length + 1); // Add a new number as a placeholder
    slideRefs.value.unshift(ref(null)); // Also add a new ref for the new slide
  };

</script>

<style lang="scss" scoped>
  .container {
    width: 100dvw;
    height: calc(100dvh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10dvh 5dvw 10dvh 5dvw;
    transform: translateY(-30px);
    overflow: hidden;
  }
  .edge {
    background-color: red;
    height: 60px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), url('/assets/images/HammeredMetalSeamlessTile.png');
    background-blend-mode: overlay, normal;
    background-size: cover, 200px;
    background-repeat: no-repeat, repeat;
    border-radius: 0px 0px 24px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3dvw 0 3dvw;
  }

  .printSlotOuter {
    background: rgba(0, 0, 0, 0.30);
    mix-blend-mode: overlay;
    box-shadow: 4px 4px 4px 0px #000 inset, -4px -4px 4px 0px rgba(255, 255, 255, 0.85) inset;
    width: 100%;
    height: 20px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2dvw 0 2dvw;
  }

  .printSlotInner {
    height: 5px;
    background-color: black;
    border-radius: 10px;
    width: 100%;
    mix-blend-mode: normal;
  }
  .missionsWrapper {
    width: 100%;
    height: 100%;
  }
  .missionSlide {
    background-color: red;
  }
  .missionSlide:not(.swiper-slide-active) {
    transition-duration: 500ms;
  }
</style>