<script setup>
import { onMounted } from 'vue';
import { useGuideStore } from '@/stores/guide';
import { Toaster } from 'vue-sonner';

const guideStore = useGuideStore();

onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase();

  const browsers = {
    opera: /opr/.test(userAgent) || /opera/.test(userAgent),
    edge: /edg/.test(userAgent) || /edge/.test(userAgent),
    yandex: /yabrowser/.test(userAgent),
    // firefox: /firefox/.test(userAgent),
    chrome: /chrome/.test(userAgent),
    // safari: /safari/.test(userAgent) && /mac os x/.test(userAgent),
  };

  for (const key in browsers) {
    if (browsers[key]) {
      guideStore.setBrowser(key);
      break;
    } else {
      guideStore.setBrowser('Неподдерживаемый');
    }
  }

  guideStore.setUrlOrigin(window.location.origin);
});
</script>

<template>
  <Toaster position="top-right" theme="dark" />

  <RouterView />
</template>
