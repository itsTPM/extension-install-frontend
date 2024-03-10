<script setup>
import { browsersData } from '@/browsers.js';
import ExtUnavailable from '@/components/ExtUnavailable.vue';
import { Button } from '@/components/ui/button/index.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress/index.js';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton/index.js';
import { useGuideStore } from '@/stores/guide';
import { IconArrowLeft } from '@tabler/icons-vue';
import { computed, onMounted, toRefs, watch } from 'vue';
import { toast } from 'vue-sonner';

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

onMounted(() => {
  getServerStatus();

  // Reset current step when browser changed because each browser has its own count of steps
  watch(storeBrowser, () => {
    guideStore.setStep(0);
  });
});

const { browser: storeBrowser } = toRefs(guideStore);
</script>

<template>
  <Transition mode="out-in" name="fade">
    <ExtUnavailable v-if="guideStore.isUnavailable" />
  </Transition>

  <div class="w-full max-w-full md:w-fit">
    <RouterLink class="inline-block" to="/">
      <Button class="mb-2 flex gap-3 transition hover:text-rose-400" variant="link">
        <IconArrowLeft size="1.5rem" />
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

          <CardDescription v-else class="items-center gap-1 md:flex">
            установка расширения
            <Skeleton class="inline-flex h-[1em] w-32 rounded-full" />
            версии
            <Skeleton class="inline-flex h-[1em] w-9 rounded-full" />
          </CardDescription>
        </div>

        <div class="flex flex-shrink">
          <Select v-model="storeBrowser">
            <SelectTrigger class="select-none focus:ring-0 focus:ring-offset-0 md:w-48">
              <SelectValue :placeholder="currentBrowser.displayName" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="(browser, index) in browsersData"
                  :key="index"
                  :class="{ hidden: browser.name === 'Неподдерживаемый' }"
                  :disabled="browser.name === guideStore.browser"
                  :textValue="browser.displayName"
                  :value="browser.name">
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
