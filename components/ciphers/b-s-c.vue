<template>
  <div class="b-s-cScreen">
    <split-input :input-count="inputCount" :code="code"></split-input>
  </div>
</template>
<script setup>
  const props = defineProps({
    inputCount: Number,
    code: String
  })
</script>

<style lang="scss" scoped>
  .b-s-cScreen {
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