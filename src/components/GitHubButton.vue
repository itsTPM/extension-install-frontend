<script setup>
import { Button } from '@/components/ui/button/index.js';

const props = defineProps({
  url: { type: String, required: true },
});
</script>

<template>
  <a :href="url">
    <Button class="flex h-fit w-full flex-col items-start justify-center py-[0.825rem]">
      <span class="text-sm font-normal">код на</span>
      <span class="text-2xl font-normal">GitHub</span>
    </Button>
  </a>
</template>
