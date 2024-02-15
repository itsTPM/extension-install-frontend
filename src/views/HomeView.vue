<script setup>
import { useGuideStore } from "@/stores/guide";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button/index.js";
import { Badge } from "@/components/ui/badge/index.js";

const guideStore = useGuideStore();

const data = {
  name: "chrome",
  displayName: "Chrome для Windows",
  steps: [
    [
      "Нажмите ",
      { component: Badge, slotContent: "Win + R" },
      " одновременно, введите ",
      { component: Badge, slotContent: "cmd" },
      " и снова одновременно нажмите ",
      { component: Badge, slotContent: "Ctrl + Shift + Enter" },
    ],
    "Шаг 2",
    "Шаг 3",
  ],
};
</script>

<template>
  <Card class="w-[40rem] h-[40rem]">
    <CardHeader>
      <CardTitle>Chrome для Windows</CardTitle>
      <CardDescription>установка расширения</CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        <template
          v-for="(item, index) in data.steps[guideStore.currentStep]"
          :key="index"
        >
          <component :is="item.component" v-if="typeof item === 'object'">
            {{ item.slotContent }}
          </component>
          <span v-else>{{ item }}</span>
        </template>
      </p>
    </CardContent>
    <CardFooter>
      <Button
        :disabled="guideStore.currentStep === 0"
        variant="outline"
        @click="guideStore.goPrevStep()"
        >Назад</Button
      >
      <Button
        :disabled="guideStore.currentStep === data.steps.length - 1"
        variant="outline"
        @click="guideStore.goNextStep()"
        >Далее</Button
      >
    </CardFooter>
  </Card>
</template>
