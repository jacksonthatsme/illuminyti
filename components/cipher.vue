<template>
  <component :is="cipherComponent" :code="code"></component>
</template>
<script setup>
  const props = defineProps({
    activeOperation: Object,
    code: String
  })
  const cipherComponent = (await import(`@/components/ciphers/${props.activeOperation.id}.vue`)).default;
</script>
<style lang="scss" scoped>

</style>
