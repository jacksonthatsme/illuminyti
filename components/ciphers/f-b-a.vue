<template>
  <div class="f-b-aScreen">
    <div class="tag">Enter the code</div>
    <split-input :input-count="inputCount" :code="code" class="input"></split-input>
    <div class="hint">
      This is what baby loves to cuddle with, but also loves to smash with.
    </div>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px;
    mix-blend-mode: multiply;
    font-family: 'Offbit';
    text-align: center;
  }
  .input {
    margin-top: 32px;
    margin-bottom: 32px;
  }
  .hint {
    font-size: 24px;
    line-height: 1.5;
  }
</style>