<script setup>
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button/index.js';
import { Progress } from '@/components/ui/progress/index.js';
import { browsersData } from '@/browsers.js';

import { useGuideStore } from '@/stores/guide';
import { onMounted } from 'vue';
import { toast } from 'vue-sonner';
import ExtUnavailable from '@/components/ExtUnavailable.vue';

const guideStore = useGuideStore();

let currentBrowser = browsersData.findIndex((browser) => browser.name === guideStore.browser);

if (currentBrowser === -1) {
  currentBrowser = 0;
}

onMounted(() => {
  const apiData = () => {
    return new Promise((resolve, reject) => {
      fetch(`${guideStore.apiUrl}/status`)
        .then((response) => response.json())
        .then((data) => {
          if (data.id && data.name && data.version) {
            guideStore.setExtId(data.id);
            guideStore.setExtName(data.name);
            guideStore.setExtVersion(data.version);
            resolve(data);
            guideStore.setAvailable();
          } else {
            reject('Ошибка при загрузке данных!');
            guideStore.setUnavailable();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
          guideStore.setUnavailable();
        });
    });
  };

  toast.promise(apiData(), {
    loading: 'Загрузка данных с сервера...',
    success: 'Расширение готово к установке!',
    error: 'Ошибка при загрузке данных!',
  });
});
</script>

<template>
  <Transition mode="out-in" name="fade">
    <ExtUnavailable v-if="guideStore.isUnavailable" />
  </Transition>
  <Card class="relative flex h-[26rem] w-full flex-col md:w-[40rem]">
    <CardHeader class="flex flex-shrink flex-row">
      <div class="flex flex-grow flex-col gap-2">
        <CardTitle>{{ browsersData[currentBrowser].displayName }}</CardTitle>
        <CardDescription v-if="guideStore.extName && guideStore.extVersion">
          установка расширения {{ guideStore.extName }} версии {{ guideStore.extVersion }}
        </CardDescription>
        <CardDescription v-else>установка расширения</CardDescription>
      </div>
      <div class="flex flex-shrink">
        <span v-if="browsersData[currentBrowser].steps.length > 1" class="select-none text-xl">
          Шаг {{ guideStore.currentStep + 1 }}
        </span>
      </div>
    </CardHeader>
    <CardContent class="flex-grow overflow-auto">
      <component
        :is="browsersData[currentBrowser].steps[guideStore.currentStep].component"
        v-bind="browsersData[currentBrowser].steps[guideStore.currentStep].props" />
    </CardContent>
    <CardFooter class="flex flex-shrink gap-3">
      <Button
        :disabled="guideStore.currentStep === browsersData[currentBrowser].steps.length - 1"
        class="flex-grow"
        @click="guideStore.goNextStep()">
        Далее
      </Button>
      <Button :disabled="guideStore.currentStep === 0" @click="guideStore.goPrevStep()">Назад</Button>
      <Progress
        v-if="browsersData[currentBrowser].steps.length > 1"
        :max="browsersData[currentBrowser].steps.length - 1"
        :model-value="guideStore.currentStep"
        class="absolute bottom-0 right-0 h-1 rounded-t-lg" />
    </CardFooter>
  </Card>
</template>
