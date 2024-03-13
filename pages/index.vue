<template>
  <section class="instructionsSection" id="instructions">
    <instructions @tutorial-complete="handleTutorialComplete"></instructions>
  </section>
  <section class="deviceSection" id="device">
    <device @print-mission="handlePrintMission" :is-peeking="isDevicePeeking"></device>
  </section>
  <section class="missionsSection" id="missions">
    <missions></missions>
  </section>
</template>

<script setup>
  const { $gsap, $ScrollToPlugin, $ScrollTrigger } = useNuxtApp()
  $gsap.registerPlugin($ScrollTrigger, $ScrollToPlugin);
  const deviceRef = ref(null)

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
    $gsap.to('.deviceContainer', {y: -200, duration: 2} )
    $gsap.from('.deviceContainer', {
              y: -200,
              scrollTrigger: {
                scroller: "main",
                trigger: '#instructions',
                start: 'bottom bottom',
                end: 'bottom top',
                markers: true,
                scrub: true
              }
            }, onComplete => {
              console.log('onComplete: ', onComplete)
            }
            )
  }
  const handlePrintMission = () => {
    $gsap.to('main', 2, {scrollTo: {y:'#missions'}})
  }


</script>

<style lang="scss" scoped>
  section {
    height: 100dvh;
    width: 100dvw;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
  // .fullpage-swiper {
  //   height: 100dvh;
  //   width: 100dvw;
  //   max-width: 500px;
  // }
</style>