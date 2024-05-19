<template>
  <div class="splitInput" ref="inputRef">
    <input
      type="text"
      class="inputSlot"
      v-for="(el, ind) in slots"
      :key="el+ind"
      v-model="slots[ind]"
      maxlength="1"
    >
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
    // console.log('shakeInput')
    // inputShake.play();
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



  const slots = reactive([])
  for (let i =0; i < props.inputCount; i++) {
      slots[i] = null;
  }

  watch(()=>props.code, (newVal, oldVal) => {
    //  console.log(newVal.slice(0, props.inputCount));
     for (let i =0; i < props.inputCount; i++) {
        slots[i] = newVal.charAt(i);
    }
  });


  const inputCont = ref(null)
</script>

<style lang="scss" scoped>
.splitInput {
  display: flex;
  font-family: 'Dotbit';
  font-weight: 500;

}
.inputSlot {
  flex-grow: 1;
  width: 100%;
  background: none;
  outline: none;
  margin: 5px;
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
</style>