<template>
  <div class="screen">
    <div class="tag">Dead drop</div>
    <div class="hint">
      Locate the marked lock box to find the 10 point mission. The code is the year of our glorious founding.
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
    text-transform: uppercase;
    letter-spacing: .1em;
  }
  .hint {
    font-size: 24px;
    line-height: 1.5;
    margin-top: 32px;
    text-align: center;
  }
</style>