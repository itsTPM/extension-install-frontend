<script setup>
import { Badge } from '@/components/ui/badge/index.js';
</script>

<template>
  <ul class="flex list-inside list-['➞'] flex-col gap-4">
    <li>
      Одновременно нажмите
      <Badge>Win + R</Badge>
      и введите
      <Badge>cmd</Badge>
    </li>
    <li>
      Затем снова одновременно нажмите
      <Badge class="font-bold underline underline-offset-4">Ctrl + Shift + Enter</Badge>
    </li>
  </ul>
</template>
