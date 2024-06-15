<template>
  <div class="screen">
    <div class="tag">Read my beak</div>
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
  .tag {
    font-size: 20px;
    margin-bottom: 16px;
  }

</style>