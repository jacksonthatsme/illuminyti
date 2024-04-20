// stores/operationsStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOperationsStore = defineStore('operations', () => {
  const operations = ref([]);

  async function fetchOperations() {
    operations.value = await queryContent('operations').find().then(ops => ops.filter(op => !op.hidden));
  }

  return {
    operations,
    fetchOperations,
  };
});
