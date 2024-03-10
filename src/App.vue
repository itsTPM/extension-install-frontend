<script setup>
import { onMounted } from 'vue';
import { Toaster } from 'vue-sonner';
import detectBrowser from './utils/detectBrowser';

onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase();
  detectBrowser(userAgent);
});
</script>

<template>
  <Toaster position="top-right" theme="dark" />

  <RouterView />
</template>
