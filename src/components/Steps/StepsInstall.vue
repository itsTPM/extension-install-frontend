<script setup>
import { Button } from '@/components/ui/button/index.js';
import { useGuideStore } from '@/stores/guide';

const guideStore = useGuideStore();
</script>

<template>
  <div class="flex flex-col gap-3">
    <span>Нажмите на кнопку и подтвердите установку во всплывающем окне</span>
    <a :href="`${guideStore.apiUrl}/extension.crx`" class="w-fit">
      <Button class="w-fit">Установить расширение</Button>
    </a>
  </div>
</template>
