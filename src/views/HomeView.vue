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

const guideStore = useGuideStore();

const data = {
  name: "chrome",
  displayName: "Chrome для Windows",
  steps: [
    "Нажмите <strong>Win + R</strong> одновременно, введите <strong>cmd</strong> и снова одновременно нажмите <strong>Ctrl + Shift + Enter</strong>",
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
      <div v-html="data.steps[guideStore.currentStep]" />
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
