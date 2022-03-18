import { defineStore } from 'pinia';

export const useCabalStore = defineStore('cabal', {
  state: () => ({
    cabals: {},
    cabalSettings: {},
    currentCabal: null,
  }),
});
