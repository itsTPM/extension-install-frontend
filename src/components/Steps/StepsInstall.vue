<script setup>
import { Button } from '@/components/ui/button/index.js';
import { useGuideStore } from '@/stores/guide';

const guideStore = useGuideStore();

const props = defineProps({
  installMethod: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div v-if="installMethod === 'oneClick'" class="flex flex-col gap-3">
    <span>Нажмите на кнопку и подтвердите установку во всплывающем окне</span>
    <a :href="`${guideStore.apiUrl}/extension.crx`" class="w-fit">
      <Button class="w-fit">Установить расширение</Button>
    </a>
  </div>

  <div v-else-if="installMethod === 'dragAndDrop'" class="flex flex-col gap-3">
    <span>
      Правой кнопкой мыши нажмите на
      <a :href="`${guideStore.apiUrl}/extension.crx`" class="w-fit">
        <Button class="w-fi h-fit p-1 text-rose-300 transition hover:text-rose-400" variant="link"
          >вот эту ссылку</Button
        > </a
      >, выберите пункт "Сохранить как" и сохраните файл расширения в любую папку
    </span>
  </div>
</template>
