<template>
  <div class="splitInput" ref="inputRef">
    <div
      v-for="(el, ind) in slots"
      :key="el+ind"
      class="inputSlotContainer"
    >
      <input
        type="text"
        class="inputSlot"
        v-model="slots[ind]"
        maxlength="1"
        readonly
      >
      <div v-if="ind === cursorIndex && !(cursorIndex === props.inputCount - 1 && slots[props.inputCount - 1]) && showCursor" class="cursor"></div>
    </div>
  </div>
</template>
<script setup>
  const inputRef = ref(null)
  const {$gsap, $event} = useNuxtApp()

  $event.$on('shakeInput', (e) => shakeInput())
  
  const props = defineProps({
    code: String,

    inputCount: {
      type: Number,
      required: true
    }
  });
  const inputShake = $gsap.timeline({paused: true});
  
  const shakeInput = () => {
    $gsap.to('.splitInput', .1, {
      x: -7,
      ease: "power3.inOut"
    });
    $gsap.to('.splitInput', .1, {
      repeat: 4,
      x: 7,
      yoyo: true,
      delay: .1,
      ease: "power3.inOut"
    });
    $gsap.to('.splitInput', .1, {
      x: 0,
      delay: .1 * 4
    });
  }

  onMounted: () => {
    inputShake.to('.splitInput', .1, {
      x: -7,
      ease: Quad.easeInOut
    });
    inputShake.to('.splitInput', .1, {
      repeat: 4,
      x: 7,
      yoyo: true,
      delay: .1,
      ease: Quad.easeInOut
    });
    inputShake.to('.splitInput', .1, {
      x: 0,
      delay: .1 * 4
    });
  }

  const slots = reactive(Array(props.inputCount).fill(''));
  const cursorIndex = ref(0);
  const showCursor = ref(true);

  watch(() => props.code, (newVal, oldVal) => {
    for (let i = 0; i < props.inputCount; i++) {
      slots[i] = newVal.charAt(i) || '';
    }
    cursorIndex.value = Math.min(newVal.length, props.inputCount - 1);
    showCursor.value = false;
    setTimeout(() => {
      showCursor.value = true;
    }, 1000);
  });
</script>
<style lang="scss" scoped>
.splitInput {
  display: flex;
  font-family: 'Dotbit';
  font-weight: 500;
}

.inputSlotContainer {
  position: relative;
  flex-grow: 1;
  margin: 5px;
}

.inputSlot {
  width: 100%;
  background: none;
  outline: none;
  border-radius: 0px;
  border-style: solid;
  border-width: 0px 0px 3px 0px;
  border-color: #5E5940;
  text-align: center;
  font-size: 26px;
  line-height: 40px;
  text-transform: uppercase;
  font-family: 'Dotbit';
  font-weight: 500;
  user-select: none;
  padding: 0px;
  pointer-events: none;
}

.cursor {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 70%;
  background-color: #5E5940;
  opacity: 0.3;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
