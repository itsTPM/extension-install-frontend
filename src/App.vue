<script setup>
import { onMounted } from 'vue';
import BrowserDetector from 'browser-dtector';
import { useGuideStore } from '@/stores/guide';

const guideStore = useGuideStore();

onMounted(() => {
  const browser = new BrowserDetector(window.navigator.userAgent);
  const browserName = browser.parseUserAgent().name;

  guideStore.setBrowser(browserName);
  guideStore.setUrlOrigin(window.location.origin);
});
</script>

<template>
  <RouterView />
</template>
