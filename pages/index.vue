<template>
    <!-- <section class="instructionsSection">
      <instructions></instructions>
    </section> -->
    <section class="deviceSection">
      <device @print-mission="handlePrintMission"></device>
    </section>
    <section class="missionsSection" id="missions">
      <missions></missions>
    </section>
</template>

<script setup>
  // const options = {
  //   licenseKey: 'MX29H-4I8Z7-91K1J-02J5J-CFSOR',
  //   verticalCentered: false,
  //   credits: false,
  //   fitToSection: false,
  //   scrollOverflow: false,
  // }
  // const fullpage = ref(null)
  const { $gsap } = useNuxtApp()
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  $gsap.registerPlugin(ScrollTrigger);

  //gsap timeline
  const printingTimeline = $gsap.timeline({paused: true})
  onMounted(() => {
    printingTimeline.to(window, {scrollTo: {y:'#missions' }, duration: 2})
  })

  const handlePrintMission = () => {
    console.log('handling Printing Mission')
    printingTimeline.play()
  }


</script>

<style lang="scss" scoped>
  section {
    height: 100dvh;
    width: 100dvw;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

</style>