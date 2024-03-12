<template>
  <div class="notFoundContainer">
    <img src="/images/screen/not-found.png" alt="">
    <h1>Rendezvous not found.<br/>Adjust your location and try again</h1>
  </div>
</template>
<script setup> 
  const props = defineProps({
    operations: {
      type: Array,
      required: true
    }
  })
</script>
<style lang="scss" scoped>

.notFoundContainer {
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
  gap: 20px;

  & img {
    height: 80px;
    margin-bottom: 10px;
  }
  h1 {
    font-family: 'Eurostile';
    line-height: 1.5;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
  }
}
</style>