import { defineStore } from 'pinia';

export const useActiveOperationStore = defineStore('activeOperation', {
  state: () => ({
    activeOperationId: null,
  }),
  actions: {
    updateActiveOperationId(id) {
      this.activeOperationId = id;
    },
    clearActiveOperationId() {
      this.activeOperationId = null;
    },
    setActiveOperationId(id) {
      this.updateActiveOperationId(id);
    }
  },
});