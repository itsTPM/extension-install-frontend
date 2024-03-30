<script setup>
import { Button } from '@/components/ui/button/index.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card/index.js';
import { IconBrandGithub, IconDownload } from '@tabler/icons-vue';
</script>

<template>
  <Card class="flex flex-col gap-6 p-10">
    <CardHeader class="w-full gap-6 p-0">
      <div class="h-28 w-48">
        <img alt="Foxford Tools Logo" class="h-full w-48" src="/logo.svg" />
      </div>
      <div class="text-center">
        <CardTitle class="text-3xl font-normal">Foxford Tools</CardTitle>
        <CardDescription>кастомизация сайта Фокса</CardDescription>
      </div>
    </CardHeader>

    <CardContent class="flex flex-col gap-3 p-0">
      <RouterLink to="/install">
        <Button class="h-fit w-full justify-between py-3">
          <span class="text-xl font-normal">установить</span>
          <IconDownload size="2rem" stroke-width="1.5" />
        </Button>
      </RouterLink>

      <a href="https://github.com/itsTPM/foxford-tools" target="_blank">
        <Button class="h-fit w-full justify-between py-3">
          <span class="text-xl font-normal">GitHub</span>
          <IconBrandGithub size="2rem" stroke-width="1.5" />
        </Button>
      </a>
    </CardContent>
  </Card>
</template>
