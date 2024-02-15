<script setup>
import { computed } from 'vue';
import { ProgressIndicator, ProgressRoot } from 'radix-vue';
import { cn } from '@/lib/utils';

const props = defineProps({
  modelValue: { type: [Number, null], required: false, default: 0 },
  max: { type: Number, required: false },
  getValueLabel: { type: Function, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ProgressRoot
    :class="cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', props.class)"
    v-bind="delegatedProps">
    <ProgressIndicator
      :style="`transform: translateX(-${100 - ((props.modelValue ?? 0) / props.max) * 100}%);`"
      class="h-full w-full flex-1 bg-primary transition-all" />
  </ProgressRoot>
</template>
