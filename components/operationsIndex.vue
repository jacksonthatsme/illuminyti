<template>
<ClientOnly>
  <div class="operationsIndexScreen">
    <Swiper 
      @swiper="getSwiperRef"
      class="operationsContainer"
      :slides-per-view="1"
      :modules="[SwiperPagination]"
      :pagination="{
        clickable: true,
        el: '.swiperPagination',
        type: 'bullets',
        bulletActiveClass: 'swiperBulletActive',
        bulletClass: 'swiperBullet',
        bulletElement: 'div'
      }"
      >
      <SwiperSlide class="operationDisplay" v-for="operation in props.operations" :key="operation.id">
        <div class="operationStatus">
          <div v-if="lockStatus(operation.id)">
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H9H12H15H18V3H15H12H9H6V0ZM6 3V6V9H3V6V3H6ZM18 3H21V6V9V12V15H24V18V21V24V27V30V33V36H21H18H15H12H9H6H3H0V33V30V27V24V21V18V15H3H6H9H12H15H18V12V9V6V3ZM15 21H12H9V24V27V30H12H15V27V24V21Z" fill="#5E5940"/>
              </svg>
          </div>
          <div v-else>
            <svg width="24" height="33" viewBox="0 0 24 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0V3H3V12H0V33H24V12H21V3H18V0H6ZM6 12H18V3H6V12ZM15 18V27H9V18H15Z" fill="#5E5940"/>
            </svg>
          </div>
        </div>
        <div class="operationClue">
          <div class="operationLabel">RNDZVS PNT</div>
          {{operation.description}}</div>
      </SwiperSlide>
    </Swiper>
    <div class="swiperControls">
      <div class="swiperPrev" @click="prevOperation">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 0V3H9V6H3V9H0V12H3V15H9V18H15V21H21V0H15Z" fill="#5E5940"/>
        </svg>
      </div>
      <div class="swiperPagination"></div>
      <div class="swiperNext" @click="nextOperation">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 0V3H12V6H18V9H21V12H18V15H12V18H6V21H0V0H6Z" fill="#5E5940"/>
        </svg>
      </div>
    </div>
  </div>
</ClientOnly>
</template>
<script setup>
  import { ref, computed } from 'vue'
  import { useUnlockedStore } from '~/stores/unlocked';

  const unlockedStore = useUnlockedStore();
  const props = defineProps({
    operations: {
      type: Array,
      required: true
    }
  })

  const lockStatus = (id) => {
    return unlockedStore.unlockedOperations.includes(id)
  }

  const swiper = ref(null)
  function getSwiperRef (swiperInstance) {
    swiper.value = swiperInstance
  }
  function nextOperation() {
    if (swiper.value) {
      swiper.value.slideNext()
    } else {
      console.log('swiper does not exist')
    }
  }
  function prevOperation() {
    if (swiper.value) {
      swiper.value.slidePrev()
    } else {
      console.log('swiper does not exist')
    }
  }

</script>

<style lang="scss" scoped>

.operationsIndexScreen {
  height: 100%;
  width: 100%;
  font-family: 'Offbit';
  color: #5E5940;
  display: flex;
  flex-direction: column;
  mix-blend-mode: multiply;
  filter: blur(.3px) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.6));
}

.operationsContainer {
  width: 100%;
  flex: 1;
}

.operationDisplay {
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}
.operationClue {
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.operationStatus {
  flex: 0 0 auto;
  margin-top: 24px;
}
.operationLabel {
  letter-spacing: 2px;
  font-size: 16px;
  display: block;
}
.swiperControls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.swiperPagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}
.swiperBullet {
  width: 6px;
  height: 6px;
  background-color: red;
  background-image: url('/assets/images/swiperBullet.svg');
  display: inline-block;
}
.swiperNext, .swiperPrev {
  padding: 16px 24px;
}
</style>