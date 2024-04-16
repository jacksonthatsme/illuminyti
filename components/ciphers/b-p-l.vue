<template>
  <div class="b-p-lScreen">
    <div class="tag">Find the connection</div>
    <split-input :input-count="inputCount" :code="code" class="input"></split-input>
    <div class="hint">
      (1,2) (2,1) (2,3)<br>(3,2) (4,1) (4,3)
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
  .b-p-lScreen {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
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
    letter-spacing: .1em;
  }
</style>