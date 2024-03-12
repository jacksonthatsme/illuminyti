<template>
  <div class="locationFoundContainer">
    <img src="/images/screen/found.png" alt="">
    <h2>Rendezvous Point</h2>
    <h1>{{activeOperation.name}}</h1>
    <h2>Found</h2>
  </div>
</template>
<script setup> 
  const props = defineProps({
    operations: {
      type: Array,
      required: true
    },
    activeOperation: {
      type: Object,
      required: true
    }
  })
  onMounted(() => {
    console.log('activeOperation: ', props.activeOperation)
  })
</script>
<style lang="scss" scoped>

.locationFoundContainer {
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
    margin-bottom: 40px;
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
    line-height: 1.5;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    font-size: 24px;
  }
}
</style>