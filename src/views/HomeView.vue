<script setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index.js';
import { useGuideStore } from '@/stores/guide.js';
import { Button } from '@/components/ui/button/index.js';
import { IconBrandGithub, IconDownload } from '@tabler/icons-vue';

const guideStore = useGuideStore();
</script>

<template>
  <Card class="relative flex h-fit flex-col gap-6 p-10">
    <CardHeader class="flex-shrink flex-col items-center gap-6 p-0">
      <img alt="" class="max-w-48" src="../../public/logo.svg" />
      <div class="text-center">
        <CardTitle class="text-3xl font-normal">Foxford Tools</CardTitle>
        <CardDescription>кастомизация сайта Фокса</CardDescription>
      </div>
    </CardHeader>
    <CardContent class="flex flex-grow flex-col gap-3 overflow-auto p-0">
      <RouterLink to="/install">
        <Button class="flex h-fit w-full justify-between py-[0.825rem]">
          <span class="text-xl font-normal">установить</span>
          <IconDownload size="32" strokeWidth="1.5" />
        </Button>
      </RouterLink>
      <a href="https://github.com/itsTPM/foxford-tools">
        <Button class="flex h-fit w-full justify-between py-[0.825rem]">
          <span class="text-xl font-normal">GitHub</span>
          <IconBrandGithub size="32" strokeWidth="1.5" />
        </Button>
      </a>
    </CardContent>
  </Card>
</template>
