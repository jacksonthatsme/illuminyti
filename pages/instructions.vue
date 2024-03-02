<template>
      <Swiper 
      @swiper="getSwiperRef"
      class="instructionsContainer"
      :slides-per-view="1"
      :modules="[SwiperEffectFade]"
      :effect="'fade'"
      :speed="0"
      :allowTouchMove="false"
      :fadeEffect="{crossFade: true}"
      >
      <SwiperSlide v-for="(page,index) in tutorialPages" :key="page.id">
        <tutorial-display ref="displayRefs" :image="page.image" :data="page" :index="index" :cta="page.cta" @advance="advanceTutorial">
        </tutorial-display>
      </SwiperSlide>
      </Swiper>
</template>
<script setup>
  import { ref, reactive, watch, nextTick } from 'vue';
  const swiper = ref(null)
  const { $gsap } = useNuxtApp()

  function getSwiperRef (swiperInstance) {
    swiper.value = swiperInstance
  }

  const displayRefs = ref([])

  function advanceTutorial() {
    if (swiper.value) {
      swiper.value.slideNext()
    }
  }

  const tutorialPages = await queryContent('tutorial').find()

  onMounted(() => {
    displayRefs.value[swiper.value.activeIndex].buildTypeIn()

    swiper.value.on('slideChange', () => {
      console.log('slide changed')
      displayRefs.value[swiper.value.activeIndex].buildTypeIn()
    })
  })
</script>

<style lang="scss" scoped>
.instructionsContainer {
  color: #00E593;
  height: 100dvh;
}
</style>