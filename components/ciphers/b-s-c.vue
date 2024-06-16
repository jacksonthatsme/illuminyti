<template>
  <div class="screen">
    <div class="tag">Down to the minute</div>
    <div class="inputWrapper">
      <split-input :input-count="inputCount" :code="code" class="input"></split-input>
      <div class="inputDivider">:</div>
    </div>
    <div class="hint">
      ((W x S)+(E x N)) - EST
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
  .input {
  }
  .hint {
    font-size: 24px;
    line-height: 1.5;
    letter-spacing: .1em;
    
    span {
      margin: 0 20px;
    }
  }

  .inputWrapper {
    position: relative;
    margin-top: 32px;
    margin-bottom: 32px;

    // &:after{
    //   position: absolute;
    //   width: 100%;
    //   height: 100%;
    //   top: 0;
    //   left: 0;
    //   bottom: 0;
    //   right: 0;
    //   content: ':';
    //   text-align: center;
    //   font-size: 48px;
    //   vertical-align: center;
    //   }
  }
  .inputDivider {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    font-size: 48px;
    vertical-align: center;
  }
</style>