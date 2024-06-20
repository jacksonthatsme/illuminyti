import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import operationsIndex from '~/components/operationsIndex.vue';
import relayLocation from '~/components/relayLocation.vue';
import locationNotFound from '~/components/locationNotFound.vue';
import locationFound from '~/components/locationFound.vue';
import missionsPrinting from '~/components/missionsPrinting.vue';
import cheatCodeInput from '~/components/cheatCodeInput.vue';
import codeAccepted from '~/components/codeAccepted.vue';

export const useScreenStore = defineStore('screenStore', {
  state: () => ({
    currentScreenComponent: shallowRef(operationsIndex),
  }),
  actions: {
    setScreen(component) {
      this.currentScreenComponent = component;
    },
  },
});