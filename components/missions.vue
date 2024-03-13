<template>
  <div class="missionsSection">
    <div class="edge" @click="addSlide">
      <div class="printSlotOuter">
        <div class="printSlotInner"></div>
      </div>
    </div>
    <div class="missionsContainer">
      <Swiper 
        @swiper="getSwiperRef"
        class="missionsWrapper"
        :slides-per-view="1"
        :modules="[SwiperEffectCards]"
        :effect="'cards'"
        >
        <SwiperSlide v-for="(operation, index) in slides.value" :key="operation.id" :ref="setSlideRef(index)" class="missionSlide">
          <missions-card :missions="operation.missions"></missions-card>
        </SwiperSlide>
      </Swiper>
      <div class="emptyWrapper">
        <div class="backArrow">
          <svg width="42" height="14" viewBox="0 0 42 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0.5L21 13L41 0.5" stroke="white"/>
          </svg>
        </div>
        <img src="/images/missions/emptyImage.png" alt="" class="emptyImage">
        <div class="emptyMessage">
          Nothing to see here yet
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, watch, nextTick } from 'vue';
const { $gsap } = useNuxtApp();
import { useUnlockedStore } from '~/stores/unlocked'; // Import the Pinia store

const swiper = ref(null);

function getSwiperRef(swiperInstance) {
  swiper.value = swiperInstance;
}

const slides = reactive([]);
const slideRefs = ref(slides.map(() => ref(null)));

const unlockedStore = useUnlockedStore(); // Access the unlocked Pinia store

const contentQuery = queryContent('operations');

let operations = null; // Initialize operations outside

contentQuery.find().then(fetchedOperations => {
  operations = fetchedOperations; // Store fetched operations

  // Seed test IDs before watch (if applicable)
  // unlockedStore.unlockedOperations = ['f-b-a', 'b-p-l']; // Replace with your test IDs
  const unlockedIds = unlockedStore.unlockedOperations;
  const filteredSlides = operations.filter(operation => unlockedIds.includes(operation.id)); // Filter operations based on unlocked IDs
  slides.value = filteredSlides; // Update slides with filtered operations
});

watch(unlockedStore, () => {
  if (!operations) return; // Skip if operations haven't been fetched yet

  const unlockedIds = unlockedStore.unlockedOperations;
  const filteredSlides = operations.filter(operation => unlockedIds.includes(operation.id)); // Filter operations based on unlocked IDs
  slides.value = filteredSlides; // Update slides with filtered operations

  // Trigger animation for newly added slides
  const newSlideIndex = slides.length - filteredSlides.length;
  nextTick(() => {
    const latestSlideRef = slideRefs.value[newSlideIndex];
    if (latestSlideRef) {
      $gsap.from(latestSlideRef.$el, {
        duration: 1,
        y: '-800px',
      });
    }
  });
});

const setSlideRef = index => el => {
  slideRefs.value[index] = el;
};
defineExpose({ setSlideRef });

</script>

<style lang="scss" scoped>

  .missionsSection {
    height:100%;
    width: 100%;
  }
  .missionsContainer {
    width: 100%;
    height: calc(100% - 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30% 5% 10% 5%;
    transform: translateY(-30px);
    overflow-x: clip;
    overflow-y: hidden;
    position: relative;
  }
  .edge {
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
  }
  .missionSlide:not(.swiper-slide-active) {
    transition-duration: 500ms;
  }

  .emptyWrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    display: grid;
    grid-template-rows: 60px auto 1fr 200px auto 1fr;
    justify-content: center;
  }
  .emptyImage {
    width: 200px;
    grid-row: 4/5;
  }
  .emptyMessage {
    color: #4D4D4D;
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 14px;
    grid-row: 5/6;
  }
  .backArrow {
    justify-self: center;
    grid-row: 2/3;
  }
</style>