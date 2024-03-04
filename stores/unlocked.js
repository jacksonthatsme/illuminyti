import { defineStore } from 'pinia'

export const useUnlockedStore = defineStore('unlocked', {
  state: () => ({
    unlockedOperations: [],
  }),
  actions: {
    unlockOperation(operationId) {
      if (!this.unlockedOperations.includes(operationId)) {
        this.unlockedOperations.push(operationId);
      }
    },
    isOperationUnlocked(operationId) {
      return this.unlockedOperations.includes(operationId);
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})