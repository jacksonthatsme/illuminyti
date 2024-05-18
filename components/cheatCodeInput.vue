<template>
  <div class="cheatCodeWrapper">
    <div class="tag">Enter Cheat Code</div>
    <split-input :input-count="6" :code="cheatCode"></split-input>
  </div>
</template>
<script setup>
  const props = defineProps(['cheatCode'])
</script>

<style lang="scss" scoped>
  .cheatCodeWrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    mix-blend-mode: multiply;
    font-family: 'Offbit';
  }
  .tag {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }
</style>