<template>
<ClientOnly>
  <div class="operationsIndexScreen">
    <Swiper 
      @swiper="getSwiperRef"
      class="operationsContainer"
      :slides-per-view="1"
      :modules="[SwiperPagination]"
      :loop="true"
      :pagination="{
        clickable: true,
        el: '.swiperPagination',
        type: 'bullets',
        bulletActiveClass: 'swiperBulletActive',
        bulletClass: 'swiperBullet',
        bulletElement: 'div',
      }"
      >
      <SwiperSlide class="operationDisplay" v-for="operation in props.operations" :key="operation.id">
        <div class="operationStatus">
          <div v-if="lockStatus(operation.id)">
            <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H9H12H15H18V3H15H12H9H6V0ZM6 3V6V9H3V6V3H6ZM18 3H21V6V9V12V15H24V18V21V24V27V30V33V36H21H18H15H12H9H6H3H0V33V30V27V24V21V18V15H3H6H9H12H15H18V12V9V6V3ZM15 21H12H9V24V27V30H12H15V27V24V21Z" fill="#5E5940"/>
              </svg>
          </div>
          <div v-else>
            <svg width="39" height="66" viewBox="0 0 39 66" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24 0H21H18H15V3H12H9V6H6V9H3V12V15H0V18V21V24V27H3V30V33H6V36V39H9V42H12V45H15V48H18V51H21V48H24V45H27V42H30V39H33V36V33H36V30V27H39V24V21V18V15H36V12V9H33V6H30V3H27H24V0ZM27 33V30H30V27V24V21V18H27V15V12H24V9H21H18H15V12H12V15V18H9V21V24V27V30H12V33H15H18H21H24H27ZM15 12V15V18H18H21H24V15V12H21H18H15ZM21 27V24V21H18V24V27H21ZM24 63V66H21H18H15V63H12V60H15V57H18H21H24V60H27V63H24Z" fill="#5E5940"/>
            </svg>
          </div>
        </div>
        <!-- <div class="operationLabel">RENDEZVOUS Point</div> -->
        <div class="operationClue" :ref="setClueRefs">
          <p>
            {{operation.description}}
          </p>
        </div>
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
  const clueRefs = reactive([]);

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

  const isOverflown = (element) => {
    return element.scrollHeight > element.clientHeight;
  };

  const resizeText = ({
    elements,
    minSize = 15,
    maxSize = 28,
    step = .5,
    unit = 'px',
    lineHeightMultiplier = 1.2 // Default line-height multiplier
  }) => {
    elements.forEach(element => {
      let i = minSize;
      let overflow = false;

      while (!overflow && i < maxSize) {
        element.style.fontSize = `${i}${unit}`;
        element.style.lineHeight = `${i * lineHeightMultiplier}${unit}`; // Set line-height based on current font size
        overflow = isOverflown(element);
        if (!overflow) i += step;
      }

      // Once overflow is detected, revert to the last non-overflow size and adjust line-height accordingly
      element.style.fontSize = `${i - step}${unit}`;
      element.style.lineHeight = `${(i - step) * lineHeightMultiplier}${unit}`;
    });
  };
  const setClueRefs = el => {
    if (el && !clueRefs.includes(el)) {
      clueRefs.push(el);
    }
  };

  onMounted(() => {
    nextTick(() => {
      if (clueRefs.length) {
        resizeText({ elements: clueRefs });
      }
    });
  });

  watch(() => props.operations, () => {
    nextTick(() => {
      // Clear previous refs and reset on each operation change
      clueRefs.length = 0;
      resizeText({ elements: clueRefs });
    });
  }, { deep: true });

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
  filter: blur(.1px) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3));
}

.operationsContainer {
  width: 100%;
  flex: 1;
}

.operationDisplay {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
}
.operationClue {
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.operationStatus {
  flex: 0 0 auto;
  margin-top: 24px;
}
.operationLabel {
  letter-spacing: 2px;
  font-size: 16px;
  display: block;
  margin-top: 12px;
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