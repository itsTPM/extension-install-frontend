import { defineStore } from 'pinia';

export const useGuideStore = defineStore('guide', {
  state: () => {
    return {
      currentStep: 0,
      browser: '',
      extId: '',
      extName: '',
      extVersion: '',
      urlOrigin: '',
      isUnavailable: false,
      apiUrl: 'https://devupdate.itstpm.tech',
    };
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
    setExtVersion(version) {
      this.extVersion = version;
    },
    setExtName(name) {
      this.extName = name;
    },
    setBrowser(browser) {
      this.browser = browser;
    },
    setUrlOrigin(url) {
      this.urlOrigin = url;
    },
    setUnavailable() {
      this.isUnavailable = true;
    },
    setAvailable() {
      this.isUnavailable = false;
    },
  },
});
