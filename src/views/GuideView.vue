<script setup>
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button/index.js';
import { Progress } from '@/components/ui/progress/index.js';

import { useGuideStore } from '@/stores/guide';
import StepsCmd from '@/components/Steps/StepsCmd.vue';
import StepsRegistry from '@/components/Steps/StepsRegistry.vue';
import StepsRefreshPolicy from '@/components/Steps/StepsRefreshPolicy.vue';
import StepInstall from '@/components/Steps/StepsInstall.vue';
import StepsUnsupported from '@/components/Steps/StepsUnsupported.vue';

const guideStore = useGuideStore();

const browsersData = [
  {
    name: 'Неподдерживаемый',
    displayName: 'Неподдерживаемый',
    steps: [
      {
        component: StepsUnsupported,
      },
    ],
  },
  {
    name: 'chrome',
    displayName: 'Chrome для Windows',
    steps: [
      { component: StepsCmd },
      { component: StepsRegistry },
      { component: StepsRefreshPolicy },
      { component: StepInstall },
    ],
  },
  {
    name: 'edge',
    displayName: 'Edge для Windows',
    steps: [
      { component: StepsCmd },
      { component: StepsRegistry },
      { component: StepsRefreshPolicy },
      { component: StepInstall },
    ],
  },
  {
    name: 'opera',
    displayName: 'Opera',
    steps: [{ component: StepInstall }],
  },
];

let currentBrowser = browsersData.findIndex((browser) => browser.name === guideStore.browser);

if (currentBrowser === -1) {
  currentBrowser = 0;
}
</script>

<template>
  <Card class="relative flex h-[26rem] w-full flex-col md:w-[40rem]">
    <CardHeader class="flex flex-shrink flex-row">
      <div class="flex flex-grow flex-col gap-2">
        <CardTitle>{{ browsersData[currentBrowser].displayName }}</CardTitle>
        <CardDescription>установка расширения</CardDescription>
      </div>
      <div class="flex flex-shrink">
        <span v-if="browsersData[currentBrowser].steps.length > 1" class="select-none text-xl">
          Шаг {{ guideStore.currentStep + 1 }}
        </span>
      </div>
    </CardHeader>
    <CardContent class="flex-grow overflow-auto">
      <component :is="browsersData[currentBrowser].steps[guideStore.currentStep].component"></component>
    </CardContent>
    <CardFooter class="flex flex-shrink gap-3">
      <Button
        :disabled="guideStore.currentStep === browsersData[currentBrowser].steps.length - 1"
        class="flex-grow"
        variant="outline"
        @click="guideStore.goNextStep()">
        Далее
      </Button>
      <Button :disabled="guideStore.currentStep === 0" variant="outline" @click="guideStore.goPrevStep()">Назад</Button>
      <Progress
        v-if="browsersData[currentBrowser].steps.length > 1"
        :max="browsersData[currentBrowser].steps.length - 1"
        :model-value="guideStore.currentStep"
        class="absolute bottom-0 right-0 h-1 rounded-t-lg" />
    </CardFooter>
  </Card>
</template>
