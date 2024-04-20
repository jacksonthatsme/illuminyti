<template>
  <template v-show="device.isInstalled">
    <main>
      <section class="instructionsSection" id="instructions">
        <instructions @tutorial-complete="handleTutorialComplete"></instructions>
      </section>
      <section class="deviceSection" id="device">
        <device :is-peeking="isDevicePeeking" ref="deviceRef"></device>
      </section>
      <section class="missionsSection" id="missions">
        <missions ref="missionRef"></missions>
      </section>
    </main>
  </template>
  <template v-show="!device.isInstalled">
    <install></install>
  </template>
</template>

<script setup>
  const { $gsap, $ScrollToPlugin, $ScrollTrigger, $event} = useNuxtApp()
  $gsap.registerPlugin($ScrollTrigger, $ScrollToPlugin);
  const deviceRef = ref(null)
  const missionRef = ref(null)
  const device = useDevice()

  const isDevicePeeking = ref(false)


  const handleTutorialComplete = () => {
    console.log('handleTutorialComplete')
    isDevicePeeking.value = true
  }

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
          console.log('Device is in final position');
          // Create and configure the GSAP timeline after the animation completes
          const tl = $gsap.timeline({
            scrollTrigger: {
              scroller: "main",
              trigger: '#instructions',
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: true,
              markers: false  // Enable markers for debugging
            }
          });

          // Set the scrubbing animation
          tl.fromTo('.deviceContainer', { y: -240 }, { y: 0 });
        }
      });
    }
  });

</script>

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
  section {
    height: 100%;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
</style>