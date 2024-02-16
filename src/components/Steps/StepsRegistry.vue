<script setup>
import CodeBlock from '@/components/CodeBlock.vue';
import { useGuideStore } from '@/stores/guide';

const guideStore = useGuideStore();

const data = [
  {
    name: 'chrome',
    path: 'HKLM\\SOFTWARE\\Policies\\Google\\Chrome',
  },
  {
    name: 'edge',
    path: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge',
  },
];

const actualPath = data?.find((item) => item.name === guideStore.browser)?.path ?? data[0].path;
</script>

<template>
  <div class="flex flex-col gap-3">
    <span>
      Выполните следующие команды в командной строке. Они добавят настройку в Chrome, разрешающую установку расширения:
    </span>
    <CodeBlock>
      reg add {{ actualPath }}\ExtensionInstallAllowlist /v 1 /t REG_SZ /d {{ guideStore.extId }} /f
    </CodeBlock>
    <CodeBlock>
      reg add {{ actualPath }}\ExtensionInstallSources /v 1 /t REG_SZ /d {{ guideStore.urlOrigin }}/* /f
    </CodeBlock>
  </div>
</template>
