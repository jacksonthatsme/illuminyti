<template>
  <component :is="cipherComponent" :input-count="inputCount" :code="code" @home-press="handleHomePress" ></component>
</template>
<script setup>
  const props = defineProps({
    activeOperation: Object,
    code: String
  })
  const inputCount = props.activeOperation.code.length
  const cipherComponent = (await import(`@/components/ciphers/${props.activeOperation.id}.vue`)).default;
  const emit = defineEmits(['sendHome'])

  const handleHomePress = () => {
    console.log('handle home press - cipher component')
    emit('sendHome')
  }
</script>
<style lang="scss" scoped>

</style>
