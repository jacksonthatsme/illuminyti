<template>
  <div class="screen">
    <div class="tag">Read my beak</div>
    <img src="/images/ciphers/eagle-grid.png" class="codex-image" alt="Clock Codex">
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
  .screen {
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

  .codex-image {
    width: 120px;
    margin-bottom: 16px;
  }
  .tag {
    font-size: 20px;
    margin-bottom: 16px;
  }
  .labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    padding: 0 10%;

  }
  .label {
    font-size: 20px;
  }
</style>