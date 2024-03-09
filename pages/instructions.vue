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
      <SwiperSlide>
        <div class="loadingWrapper">
          <img src="/images/tutorial/loadingGraphic.png" alt="" class="loadingImage">
          <div class="loadingContainer">
            <div class="loadingBar">
              <div class="loadingProgress">100</div>
            </div>
          </div>
          <h1 class="loadingLabel">Starting program</h1>
        </div>
      </SwiperSlide>
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

    swiper.value.on('slideChange', () => {
      displayRefs.value[swiper.value.activeIndex-1].buildTypeIn()
    })

    $gsap.to('.loadingBar', {
      width: '100%',
      duration: 3,
      ease: 'steps(20)',
      onComplete: () => {
        swiper.value.slideNext()
      }
    })
    $gsap.from('.loadingProgress', {
      textContent: 0,
      duration: 3,
      ease: 'steps(25)',
      snap: { textContent: 1 },
    })

  })
</script>

<style lang="scss" scoped>
.instructionsContainer {
  color: #00E593;
  height: 100dvh;
  width: 100%;
}
.loadingContainer {
  width: 80%;
  height: 60px;
  border: 3px solid #00E593;
  padding: 3px;
  overflow: hidden;
}
.loadingWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
}
.loadingImage {
  width: 200px;
  height: 200px;
  margin-bottom: 40px;
}
.loadingBar {
  width: 0%;
  height: 100%;
  background: #00E593;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.loadingLabel {
  font-family: 'Offbit';
  font-weight: 700;
  text-transform: uppercase;
  font-size: 28px;
  letter-spacing: 2px;
}
.loadingProgress{
  mix-blend-mode: difference;
  font-family: 'Offbit';
  font-weight: 700;
  text-transform: uppercase;
  font-size: 28px;
  letter-spacing: 2px;
  padding: 0px 10px;
}
</style>