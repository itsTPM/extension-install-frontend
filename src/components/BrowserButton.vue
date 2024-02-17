<script setup>
import { Button } from '@/components/ui/button/index.js';

const props = defineProps({
  browser: { type: String, required: true },
  url: { type: String, required: true },
});
</script>

<template>
  <RouterLink :to="url">
    <Button class="flex h-fit w-full flex-col items-start justify-center py-[0.825rem]">
      <span class="text-sm font-normal">установить для</span>
      <span class="text-2xl font-normal">{{ browser }}</span>
    </Button>
  </RouterLink>
</template>
