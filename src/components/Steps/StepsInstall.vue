<script setup>
import { Button } from '@/components/ui/button/index.js';
import { useGuideStore } from '@/stores/guide';
import { onMounted } from 'vue';

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
    <p>Нажмите на кнопку и подтвердите установку во всплывающем окне</p>
    <Button class="w-fit" as="a" :href="`${guideStore.apiUrl}/extension.crx?guide=true`">Установить расширение</Button>
  </div>

  <div v-else-if="installMethod === 'firefox'" class="flex flex-col gap-3">
    <p>Нажмите на кнопку и подтвердите установку во всплывающем окне</p>
    <Button class="w-fit" :href="`${guideStore.apiUrl}/firefox/latest`" as="a">Установить расширение</Button>
  </div>

  <div v-else-if="installMethod === 'dragAndDrop'" class="flex flex-col gap-3">
    <p>
      Правой кнопкой мыши нажмите на
      <Button
        class="h-fit w-fit p-1 text-rose-300 transition hover:text-rose-400"
        variant="link"
        :href="`${guideStore.apiUrl}/extension.crx?guide=true`"
        as="a"
        >вот эту ссылку</Button
      >
      , выберите пункт "Сохранить как" и сохраните файл расширения в любую папку
    </p>
  </div>
</template>
