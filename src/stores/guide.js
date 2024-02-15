import { defineStore } from "pinia";

export const useGuideStore = defineStore("guide", {
  state: () => {
    return { currentStep: 0 };
  },
  actions: {
    goNextStep() {
      this.currentStep++;
    },
    goPrevStep() {
      this.currentStep--;
    },
  },
});
