<script setup>
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button/index.js';
import { Progress } from '@/components/ui/progress/index.js';
import { browsersData } from '@/browsers.js';

import { useGuideStore } from '@/stores/guide';
import { computed, onMounted } from 'vue';
import { toast } from 'vue-sonner';
import ExtUnavailable from '@/components/ExtUnavailable.vue';
import { IconArrowLeft } from '@tabler/icons-vue';

const guideStore = useGuideStore();

let currentBrowser = computed(() => browsersData.find((browser) => browser.name === guideStore.browser));

function getServerStatus() {
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
}

function changeBrowser(browser) {
  guideStore.setStep(0);
  guideStore.setBrowser(browser.name);
}

onMounted(() => {
  getServerStatus();
});
</script>

<template>
  <Transition mode="out-in" name="fade">
    <ExtUnavailable v-if="guideStore.isUnavailable" />
  </Transition>

  <div class="max-w-full">
    <RouterLink class="inline-block" to="/">
      <Button class="mb-2 flex gap-3" variant="link">
        <IconArrowLeft />
        На главную
      </Button>
    </RouterLink>

    <Card class="relative flex h-[26rem] w-full flex-col md:w-[40rem]">
      <CardHeader class="flex flex-shrink flex-col gap-3 md:flex-row">
        <div class="flex flex-grow flex-col gap-2">
          <CardTitle>{{ currentBrowser.displayName }}</CardTitle>

          <CardDescription v-if="guideStore.extName && guideStore.extVersion">
            установка расширения {{ guideStore.extName }} версии {{ guideStore.extVersion }}
          </CardDescription>

          <CardDescription v-else>установка расширения</CardDescription>
        </div>

        <div class="flex flex-shrink">
          <Select>
            <SelectTrigger class="select-none focus:ring-0 focus:ring-offset-0">
              <SelectValue :placeholder="currentBrowser.displayName" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="(browser, index) in browsersData.filter((browser) => browser.name !== 'Неподдерживаемый')"
                  :key="index"
                  :disabled="browser.name === guideStore.browser"
                  :textValue="browser.displayName"
                  :value="browser.name"
                  @click="changeBrowser(browser, index)">
                  {{ browser.displayName }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent class="flex-grow overflow-auto">
        <component
          :is="currentBrowser.steps[guideStore.currentStep].component"
          v-bind="currentBrowser.steps[guideStore.currentStep].props" />
      </CardContent>

      <CardFooter class="flex flex-shrink gap-3">
        <Button
          :disabled="guideStore.currentStep === currentBrowser.steps.length - 1"
          class="flex-grow"
          @click="guideStore.setStep((guideStore.currentStep += 1))">
          Далее
        </Button>

        <Button :disabled="guideStore.currentStep === 0" @click="guideStore.setStep((guideStore.currentStep -= 1))">
          Назад
        </Button>

        <Progress
          v-if="currentBrowser.steps.length > 1"
          :max="currentBrowser.steps.length - 1"
          :model-value="guideStore.currentStep"
          class="absolute bottom-0 right-0 h-1 rounded-t-lg" />
      </CardFooter>
    </Card>
  </div>
</template>
