<script setup>
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card/index.js';
import BrowserButton from '@/components/BrowserButton.vue';
import { useGuideStore } from '@/stores/guide.js';
import { browsersData } from '@/browsers.js';
import GitHubButton from '@/components/GitHubButton.vue';

const guideStore = useGuideStore();

const currentBrowser = browsersData.find((browser) => browser.name === guideStore.browser) || browsersData[0];
</script>

<template>
  <Card class="relative flex h-fit flex-col gap-4 p-10">
    <CardHeader class="flex-shrink flex-col items-center gap-4 p-0">
      <img alt="" class="max-w-[200px]" src="../../public/logo.svg" />
      <div class="text-center">
        <CardTitle class="text-4xl font-normal">Foxford Tools</CardTitle>
        <CardDescription>кастомизация сайта Фокса</CardDescription>
      </div>
    </CardHeader>
    <CardContent class="flex flex-grow flex-col gap-2 overflow-auto p-0">
      <BrowserButton :browser="currentBrowser.displayName" url="/install" />
      <GitHubButton url="https://github.com/itsTPM/foxford-tools" />
    </CardContent>
    <CardFooter class="flex-shrink p-0">
      <span class="w-full text-center text-sm text-muted-foreground">
        другой браузер? нажмите
        <span class="cursor-pointer text-primary transition hover:text-muted-foreground">сюда</span>
      </span>
    </CardFooter>
  </Card>
</template>
