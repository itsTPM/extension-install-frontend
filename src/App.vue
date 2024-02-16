<script setup>
import { onMounted } from 'vue';
import { useGuideStore } from '@/stores/guide';
import { toast, Toaster } from 'vue-sonner';

const guideStore = useGuideStore();

onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase();

  const browsers = {
    opera: /opr/.test(userAgent) || /opera/.test(userAgent),
    edge: /edg/.test(userAgent) || /edge/.test(userAgent),
    yandex: /yabrowser/.test(userAgent),
    firefox: /firefox/.test(userAgent),
    chrome: /chrome/.test(userAgent),
    safari: /safari/.test(userAgent) && /mac os x/.test(userAgent),
  };

  for (const key in browsers) {
    if (browsers[key]) {
      guideStore.setBrowser(key);
      break;
    }
  }

  guideStore.setUrlOrigin(window.location.origin);

  const apiData = () => {
    return new Promise((resolve, reject) => {
      fetch('https://update.itstpm.tech/status')
        .then((response) => response.json())
        .then((data) => {
          if (data.id && data.name && data.version) {
            guideStore.setExtId(data.id);
            resolve(data);
          } else {
            reject('Ошибка при загрузке данных!');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  };

  toast.promise(apiData(), {
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
