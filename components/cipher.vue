<template>
  <component :is="cipherComponent" :input-count="inputCount" :code="code"></component>
</template>
<script setup>
  const props = defineProps({
    activeOperation: Object,
    code: String
  })
  const inputCount = props.activeOperation.code.length
  const cipherComponent = (await import(`@/components/ciphers/${props.activeOperation.id}.vue`)).default;
</script>
<style lang="scss" scoped>

</style>
