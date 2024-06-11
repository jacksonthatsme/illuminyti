<template>
  <div class="r-f-cScreen">
    <div class="tag">Lightning letters say:</div>
    <split-input :input-count="inputCount" :code="code" class="input"></split-input>
    <div class="hint">
      What do you get when you put Mac Tonight in a sauna?
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
  .r-f-cScreen {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px;
    mix-blend-mode: multiply;
    font-family: 'Offbit';
  }
  .input {
    margin-top: 32px;
    margin-bottom: 32px;
  }
  .hint {
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: .1em;
    text-align: center;
  }
</style>