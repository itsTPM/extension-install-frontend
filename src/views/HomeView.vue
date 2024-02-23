<script setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index.js';
import { Button } from '@/components/ui/button/index.js';
import { IconBrandGithub, IconDownload } from '@tabler/icons-vue';
</script>

<template>
  <Card class="flex flex-col gap-6 p-10">
    <CardHeader class="w-full gap-6 p-0">
      <img alt="" class="h-[6.5rem] w-48" src="/logo.svg" />
      <div class="text-center">
        <CardTitle class="text-3xl font-normal">Foxford Tools</CardTitle>
        <CardDescription>кастомизация сайта Фокса</CardDescription>
      </div>
    </CardHeader>

    <CardContent class="flex flex-col gap-3 p-0">
      <RouterLink to="/install">
        <Button class="h-fit w-full justify-between py-[0.825rem]">
          <span class="text-xl font-normal">установить</span>
          <IconDownload size="32" strokeWidth="1.5" />
        </Button>
      </RouterLink>

      <a href="https://github.com/itsTPM/foxford-tools" target="_blank">
        <Button class="h-fit w-full justify-between py-[0.825rem]">
          <span class="text-xl font-normal">GitHub</span>
          <IconBrandGithub size="32" strokeWidth="1.5" />
        </Button>
      </a>
    </CardContent>
  </Card>
</template>
