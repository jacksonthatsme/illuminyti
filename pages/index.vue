<template>
  <section class="instructionsSection" id="instructions">
    <instructions @tutorial-complete="handleTutorialComplete"></instructions>
  </section>
  <section class="deviceSection" id="device">
    <device @print-mission="handlePrintMission" :is-peeking="isDevicePeeking"></device>
  </section>
  <section class="missionsSection" id="missions">
    <missions ref="missionRef"></missions>
  </section>
</template>

<script setup>
  const { $gsap, $ScrollToPlugin, $ScrollTrigger, $event} = useNuxtApp()
  $gsap.registerPlugin($ScrollTrigger, $ScrollToPlugin);
  const deviceRef = ref(null)
  const missionRef = ref(null)

  const isDevicePeeking = ref(false)

  // onMounted(() => {
  //   $gsap.from('.deviceContainer', {
  //             y: 0,
  //             scrollTrigger: {
  //               scroller: "main",
  //               trigger: '#instructions',
  //               start: 'bottom bottom',
  //               end: 'bottom top',
  //               markers: true,
  //               scrub: true
  //             }
  //           }, onComplete => {
  //             console.log('onComplete: ', onComplete)
  //           }
  //           )
  // })

  const handleTutorialComplete = () => {
    console.log('hqndleTutorialComplete')
    isDevicePeeking.value = true

    const tl = $gsap.timeline();
    
    tl.to('.deviceContainer', {y: -200, duration: 1, ease: 'power2.inOut'})
    .from('.deviceContainer', { 
        y: -200,
        scrollTrigger: {
          scroller: "main",
          trigger: '#instructions',
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true
        }
      }); // Set stagger to 0 for immediate execution
  }
  const handlePrintMission = () => {
    // $gsap.to('main', 2, {scrollTo: {y:'#missions'}, ease: 'power4.out',})
    missionRef.value.addDummySlide()
  }


</script>

<style lang="scss" scoped>
  section {
    height: 100%;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
  // .fullpage-swiper {
  //   height: 100dvh;
  //   width: 100dvw;
  //   max-width: 500px;
  // }
</style>