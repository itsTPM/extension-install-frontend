import { defineStore } from 'pinia';

export const useGuideStore = defineStore('guide', {
  state: () => {
    return { currentStep: 0, browser: '', extId: '', urlOrigin: '', isUnavailable: false };
  },
  actions: {
    goNextStep() {
      this.currentStep++;
    },
    goPrevStep() {
      this.currentStep--;
    },
    setExtId(id) {
      this.extId = id;
    },
    setBrowser(browser) {
      this.browser = browser;
    },
    setUrlOrigin(url) {
      this.urlOrigin = url;
    },
    toggleUnavailable() {
      this.isUnavailable = true;
    },
  },
});
