<template>
  <div class="keyButton">
    <div class="keyMain">
      <slot></slot>
    </div>
    <div class="keySub" v-if="keySub">
      {{ keySub }}
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    keySub: String
  })
</script>

<style lang="scss" scoped>
  .keyButton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFFDF6;
    border-radius: 8px;
    box-shadow: 0px -4px 1px 0px rgba(0, 0, 0, 0.25) inset, 4px 4px 24px 0px rgba(0, 0, 0, 0.45), 3px 4px 2px 0px rgba(0, 0, 0, 0.90);
    font-family: 'Eurostile';
    font-weight: 500;

    &:active {
      box-shadow: 0px -4px 1px 0px rgba(0, 0, 0, 0) inset, 4px 4px 24px 0px rgba(0, 0, 0, 0), 3px 4px 2px 0px rgba(0, 0, 0, 0);
      transform: translateY(2px);
    }
  }

  .keyMain {
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 24px;
  }
  .keySub {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
</style>