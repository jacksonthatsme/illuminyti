<template>
  <section class="instructionsSection" id="instructions">
    <instructions></instructions>
  </section>
  <section class="deviceSection" id="device" ref="deviceSectionRef">
    <device :is-peeking="isDevicePeeking.value" ref="deviceRef"></device>
  </section>
  <section class="missionsSection" id="missions">
    <missions ref="missionRef"></missions>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { useTutorialStatus } from '~/stores/tutorialStatusStore';
import { useFirstRunStore } from '~/stores/firstRunStore';

const { $gsap, $ScrollToPlugin, $ScrollTrigger, $event } = useNuxtApp();
$gsap.registerPlugin($ScrollTrigger, $ScrollToPlugin);

const deviceRef = ref(null);
const missionRef = ref(null);
const deviceSectionRef = ref(null);

const isDevicePeeking = ref(false);
const tutorialStatus = useTutorialStatus();
const firstRunStore = useFirstRunStore();

$event.$on('tutorialComplete', () => {
  console.log('tutorialComplete');
  isDevicePeeking.value = true;
  tutorialStatus.markTutorialCompleted();
  firstRunStore.markInstructionsAsCompleted();

});

onMounted(() => {
  nextTick(() => {
    if (tutorialStatus.tutorialCompleted && deviceSectionRef.value) {
      deviceSectionRef.value.scrollIntoView({
        behavior: 'auto', // Instant scrolling, use 'smooth' for smooth scrolling
        block: 'start' // Align to the start (top) of the viewport
      });
    }
  });
});

watch(isDevicePeeking, (newVal) => {
  if (newVal) {
    console.log('Device is peeking:', newVal);

    // First animate the device to its final position
    $gsap.to('.deviceContainer', {
      y: -240,
      duration: 1.5,
      delay: 2,
      ease: 'power4.out',
      onComplete: () => {
        // Create and configure the GSAP timeline after the animation completes
        const tl = $gsap.timeline({
          scrollTrigger: {
            scroller: "main",
            trigger: '#instructions',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
            markers: false, // Enable markers for debugging
          }
        });

        // Set the scrubbing animation
        tl.fromTo('.deviceContainer', { y: -240 }, { y: 0, onComplete: () => {
          console.log('Device animation scrub complete');
          // Emit an event to the device component to start the tour
          $event.$emit('startTour');
        } });
      }
    });
  }
});
</script>


<style lang="scss" scoped>
  section {
    height: 100%;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
  .deviceSection {
    position: relative;
    z-index: 10;
  }
</style>