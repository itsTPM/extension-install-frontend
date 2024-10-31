<script setup>
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { IconBrandGithub, IconDownload } from '@tabler/icons-vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <Card class="flex flex-col gap-6 p-10">
    <CardHeader class="w-full gap-0 p-0 text-center">
      <div class="mb-6 h-28 w-48">
        <img alt="Foxford Tools Logo" class="h-full w-48" src="/logo.svg" />
      </div>
      <h1 class="text-3xl font-normal tracking-tight">Foxford Tools</h1>
      <CardDescription>кастомизация сайта Фокса</CardDescription>
    </CardHeader>

    <CardContent class="flex flex-col gap-3 p-0">
      <Button class="h-fit w-full justify-between py-3" as-child>
        <RouterLink to="/install">
          <p class="text-xl font-normal">установить</p>
          <IconDownload size="2rem" stroke-width="1.5" aria-hidden="true" />
        </RouterLink>
      </Button>

      <Button class="h-fit w-full justify-between py-3" as="a" href="https://github.com/itsTPM/foxford-tools">
        <p class="text-xl font-normal">GitHub</p>
        <IconBrandGithub size="2rem" stroke-width="1.5" aria-hidden="true" />
      </Button>
    </CardContent>
  </Card>
</template>
