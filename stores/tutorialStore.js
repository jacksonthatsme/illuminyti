// stores/tutorialStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTutorialStore = defineStore('tutorial', () => {
  const tutorialPages = ref([]);

  async function fetchTutorialPages() {
    tutorialPages.value = await queryContent('tutorial').find();
  }

  return {
    tutorialPages,
    fetchTutorialPages,
  };
});
