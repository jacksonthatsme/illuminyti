<template>
  <div class="screen">
    <div class="tag">Dedication is key</div>
    <split-input :input-count="inputCount" :code="code" class="input"></split-input>
    <div class="hint">
      Usffgf*
    </div>
    <div class="sub">*Et tu, Brute?</div>
  </div>
</template>
<script setup>
  const props = defineProps({
    inputCount: Number,
    code: String
  })
</script>

<style lang="scss" scoped>
  .screen {
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
    font-size: 32px;
    line-height: 1.1;
    text-transform: uppercase;
    letter-spacing: .1em;
  }
  .tag {
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: .1em;
  }
  .sub {
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: .1em;    
  }
</style>