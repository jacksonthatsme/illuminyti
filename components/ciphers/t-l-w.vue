<template>
  <div class="t-l-wScreen">
    <div class="tag">Query the quotes</div>
    <split-input :input-count="inputCount" :code="code"></split-input>
    <ul class="hint">
      <li>
        <span class="left">Woolf</span>
        <span class="right">38</span>
      </li>
      <li>
        <span class="left">Carroll</span>
        <span class="right">9</span>
      </li>
      <li>
        <span class="left">Dickenson</span>
        <span class="right">43</span>
      </li>
      <li>
        <span class="left">Hemingway</span>
        <span class="right">1</span>
      </li>
      <li>
        <span class="left">Bacon</span>
        <span class="right">36</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
  const props = defineProps({
    inputCount: Number,
    code: String
  })
</script>

<style lang="scss" scoped>
  .t-l-wScreen {
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
  .hint {
    width: 100%;
    margin-top: 10px;
  }
  .hint li {
    display: flex;
    padding-top: 5px;
  }

  .hint li .left {
    order: 1;
  }

  .hint li .right {
    order: 3;
  }
  .tag {
    margin-bottom: 10px;
  }

  .hint li::after {
    background-image: radial-gradient(circle, currentcolor 1px, transparent 1.5px);
    background-position: bottom;
    background-size: 1ex 4.5px;
    background-repeat: space no-repeat;
    content: "";
    flex-grow: 1;
    height: 1em;
    order: 2;
  }
</style>