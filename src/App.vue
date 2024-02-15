<script setup>
import { onMounted } from 'vue';
import BrowserDetector from 'browser-dtector';
import { useGuideStore } from '@/stores/guide';
import { toast, Toaster } from 'vue-sonner';

const guideStore = useGuideStore();

onMounted(() => {
  const browser = new BrowserDetector(window.navigator.userAgent);
  const browserName = browser.parseUserAgent().name;

  guideStore.setBrowser(browserName);
  guideStore.setUrlOrigin(window.location.origin);

  const promise = () => {
    return new Promise((resolve, reject) => {
      fetch('https://update.itstpm.tech/status')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  };

  toast.promise(promise(), {
    loading: 'Загрузка данных с сервера...',
    success: 'Расширение готово к установке!',
    error: 'Ошибка при загрузке данных!',
  });
});
</script>

<template>
  <Toaster position="top-right" theme="dark" />
  <RouterView />
</template>
