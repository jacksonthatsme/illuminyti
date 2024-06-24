// a store that tracks whether the user has completed the tutorial and saved the value to local storage
import { defineStore } from 'pinia'

export const useTutorialStatus = defineStore('tutorialStatus', {
  state: () => ({
    tutorialCompleted: false,
  }),
  actions: {
    markTutorialCompleted() {
      this.tutorialCompleted = true;
    },

  },
  persist: {
    storage: persistedState.localStorage,
  },
})