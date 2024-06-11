<template>
  <div class="m-t-pScreen">
    <div class="tag">Get on the same page</div>
    <split-input :input-count="inputCount" :code="code" class="input"></split-input>
    <div class="hint">
      <span>§24</span>
      <span>¶2</span>
      <span>|→4</span>
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
  .m-t-pScreen {
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
    line-height: 1.5;
    letter-spacing: .1em;
    
    span {
      margin: 0 20px;
    }
  }
</style>