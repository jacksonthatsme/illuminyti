// stores/firstRunStore.js

import { defineStore } from 'pinia';

export const useFirstRunStore = defineStore('firstRun', {
  state: () => ({
    isInstructionsCompleted: false,
    hasCompletedFirstTour: false,
    hasFoundFirstCheckpoint: false,
    hasUnlockedFirstMission: false,
  }),
  actions: {
    markInstructionsAsCompleted(completed) {
      this.isInstructionsCompleted = completed;
    },
    markFirstCheckpointAsFound(found) {
      this.hasFoundFirstCheckpoint = found;
    },
    markFirstMissionAsUnlocked(unlocked) {
      this.hasUnlockedFirstMission = unlocked;
    },
    markFirstTourAsCompleted(completed) {
      this.hasCompletedFirstTour = completed;
    }
  },
  getters: {
    instructionsCompleted: (state) => state.isInstructionsCompleted,
    firstTourCompleted: (state) => state.hasCompletedFirstTour,
    firstCheckpointFound: (state) => state.hasFoundFirstCheckpoint,
    firstMissionUnlocked: (state) => state.hasUnlockedFirstMission,
    isFirstRun: (state) => !state.isInstructionsCompleted && !state.hasFoundFirstCheckpoint && !state.hasUnlockedFirstMission,
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
