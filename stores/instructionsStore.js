// stores/operationsStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInstructionsStore = defineStore('instructions', () => {
  const instructions = ref([]);

  async function fetchInstructions() {
    instructions.value = await queryContent('instructions').find();
  }

  return {
    instructions,
    fetchInstructions,
  };
});
