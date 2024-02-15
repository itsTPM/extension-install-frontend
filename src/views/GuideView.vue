<script setup>
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button/index.js';

import { useGuideStore } from '@/stores/guide';
import StepsCmd from '@/components/Steps/StepsCmd.vue';
import StepsRegistry from '@/components/Steps/StepsRegistry.vue';

const guideStore = useGuideStore();

const data = {
  name: 'chrome',
  displayName: 'Chrome для Windows',
  steps: [[{ component: StepsCmd }], [{ component: StepsRegistry }]],
};
</script>

<template>
  <Card class="flex h-[30rem] w-[40rem] flex-col">
    <CardHeader class="flex-shrink">
      <CardTitle>{{ data.displayName }}</CardTitle>
      <CardDescription>установка расширения</CardDescription>
    </CardHeader>
    <CardContent class="flex-grow">
      <template v-for="(item, index) in data.steps[guideStore.currentStep]" :key="index">
        <component :is="item.component"></component>
      </template>
    </CardContent>
    <CardFooter class="flex flex-shrink gap-3">
      <Button
        :disabled="guideStore.currentStep === data.steps.length - 1"
        class="flex-grow"
        variant="outline"
        @click="guideStore.goNextStep()">
        Далее
      </Button>
      <Button :disabled="guideStore.currentStep === 0" variant="outline" @click="guideStore.goPrevStep()">Назад</Button>
    </CardFooter>
  </Card>
</template>
