<template>
  <div class="container">
    <h2>Nice work</h2>
    <h1>Code Accepted</h1>
    <h2>you did it</h2>
  </div>
</template>
<script setup> 
  const props = defineProps({
    operations: {
      type: Array,
      required: true
    }, 
  })
</script>
<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-family: 'Offbit';
  color: #5E5940;
  mix-blend-mode: multiply;
  filter: blur(.1px) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3));
  padding-left: 20px;
  padding-right: 20px;

  & img {
    height: 80px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  h2 {
    font-family: 'Eurostile';
    line-height: 1.5;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    font-size: 16px;
  }
  h1 {
    font-family: 'Eurostile';
    line-height: 1.1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    font-size: 36px;
  }
}
</style>