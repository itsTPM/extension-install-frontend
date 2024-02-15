<script setup>
import CodeBlock from '@/components/CodeBlock.vue';
</script>

<template>
  <div>
    Запустите следующие команды в командной строке. Они добавят настройку в Chrome, разрешающую установку расширения:
  </div>
  <CodeBlock>
    reg add HKLM\\SOFTWARE\\Policies\\Google\\Chrome\\ExtensionInstallAllowlist /v 1 /t REG_SZ /d
    knimogpileejkhflhilmlpkhgagekolf /f
  </CodeBlock>
</template>
