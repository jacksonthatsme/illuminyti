<template>
  <div class="f-b-aScreen">
    <split-input :input-count="5" :code="code"></split-input>
  </div>
</template>
<script setup>
  const props = defineProps({
    inputCount: Number,
    code: String
  })
</script>

<style lang="scss" scoped>
  .f-b-aScreen {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px;
    mix-blend-mode: multiply;
    font-family: 'Offbit';
  }
</style>