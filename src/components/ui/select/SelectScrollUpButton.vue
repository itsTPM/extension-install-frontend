<script setup>
import { computed } from 'vue';
import { SelectScrollUpButton, useForwardProps } from 'radix-vue';
import { IconChevronUp } from '@tabler/icons-vue';
import { cn } from '@/lib/utils';

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwardedProps"
    :class="cn('flex cursor-default items-center justify-center py-1', props.class)">
    <slot>
      <IconChevronUp class="h-4 w-4" stroke-width="1.5" />
    </slot>
  </SelectScrollUpButton>
</template>
