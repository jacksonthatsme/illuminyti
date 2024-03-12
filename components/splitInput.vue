<template>
  <div class="splitInput" ref="inputCont">
    <input
      type="text"
      class="inputSlot"
      v-for="(el, ind) in slots"
      :key="el+ind"
      v-model="slots[ind]"
      :autofocus="ind === 0"
      maxlength="1"
    >
  </div>
</template>
<script setup>
  const props = defineProps({
    code: String,

    inputCount: {
      type: Number,
      required: true
    }
  });

  const slots = reactive([])
  for (let i =0; i < props.inputCount; i++) {
      slots[i] = null;
  }

  watch(()=>props.code, (newVal, oldVal) => {
     console.log(newVal.slice(0, props.inputCount));
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
  font-size: 30px;
  line-height: 40px;
  text-transform: uppercase;
  font-family: 'Dotbit';
  font-weight: 500;
}
</style>