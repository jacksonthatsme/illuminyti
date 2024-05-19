<template>
  <div class="missionsSection">
    <div class="edge" @click="addDummySlide">
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
        <SwiperSlide 
          v-for="(operation, index) in slides" 
          :key="operation.id" 
          :ref="setSlideRef(index)" 
          class="missionSlide"
        >
          <missions-card :missions="operation.missions"></missions-card>
        </SwiperSlide>
      </Swiper>
      <div class="emptyWrapper">
        <div class="backArrow" @click="scrollToDevice">
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
import { ref, watch, nextTick } from 'vue';
import { useUnlockedStore } from '~/stores/unlocked'; // Import the Pinia store
import { useNuxtApp } from '#app';

const { $gsap } = useNuxtApp();

const swiper = ref(null);
const slides = ref([]);
const slideRefs = ref([]); // Array to store refs

const unlockedStore = useUnlockedStore(); // Access the Pinia store

const contentQuery = queryContent('operations'); // Assuming a function to fetch operations

let operations = null; // Initialize operations outside

function getSwiperRef(swiperInstance) {
  swiper.value = swiperInstance;
}

function scrollToDevice() {
  $gsap.to('main', { duration: 1, scrollTo: { y: '#device' }, ease: 'power4.out' });
}

// Function to perform slide animation
function animateSlide(slideRef) {
  if (slideRef) {
    console.log('Animating slide:', slideRef);
    $gsap.from(slideRef, {
      duration: 2,
      ease: "power2.inOut",
      y: '-800px',
    });
    $gsap.to('main', { duration: 2, scrollTo: { y: '#missions' }, ease: "power2.inOut" }, "<");
  } else {
    console.error('Slide ref is null');
  }
}

// Fetch operations on load and update slides
contentQuery.find().then(fetchedOperations => {
  operations = fetchedOperations;
  setSlides(); // Call the update function to handle initial population
});

//watch unlocked store, if theres a new unlocked operation, add it to the slides
watch(unlockedStore, () => {
    const newUnlockedOperations = unlockedStore.unlockedOperations.filter(
      (id) => !slides.value.some((slide) => slide.id === id)
    ); // Filter new unlocked operations

    newUnlockedOperations.forEach((operationId) => {
      const newSlide = operations.find((operation) => operation.id === operationId);
      if (newSlide) {
        addSlide(newSlide);
      }
    });
  });

function setSlides() {
  if (!operations) return;

  const unlockedIds = unlockedStore.unlockedOperations;
  const filteredSlides = operations.filter(operation => unlockedIds.includes(operation.id));

  slides.value = filteredSlides;
  updateSlideRefs();
}

function updateSlideRefs() {
  slideRefs.value = slides.value.map(() => ref(null));
}

const setSlideRef = index => el => {
  if (el) {
    slideRefs.value[index] = el;
  }
};

// Function to add a new slide and animate it
function addSlide(newSlideData) {
  slides.value.unshift(newSlideData); // Add to the front
  slideRefs.value.unshift(ref(null));

  nextTick(() => {
    if (swiper.value) swiper.value.update(); // Update Swiper
    const newSlideRef = slideRefs.value[0];
    console.log('newSlideRef:', newSlideRef); // Debug log to check the ref

    const target = newSlideRef?.$el || newSlideRef; // Ensure the ref is a DOM element
    console.log('target for animation:', target); // Debug log to check the target

    animateSlide(target); // Animate the newly added slide
  });
}

// Function to add a dummy slide with animation
const addDummySlide = () => {
  const dummySlide = {
    id: 'stubbed-id',
    missions: [
      {
        points: 1,
        content: 'This is a stubbed mission description',
      },
      {
        points: 3,
        content: 'This is a stubbed mission description',
      },
      {
        points: 5,
        content: 'This is a stubbed mission description',
      },
    ],
  };
  addSlide(dummySlide);
};

defineExpose({ setSlideRef, addDummySlide });

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
