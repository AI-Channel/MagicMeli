<script setup lang="ts">
import { type Ref, ref } from 'vue'
import IconClose from './icons/IconClose.vue'
import IconMaximize from './icons/IconMaximize.vue'
import IconMinimize from './icons/IconMinimize.vue'
import { useWindowStore } from '@/stores/showWindow'
const props = defineProps<{
  title?: string
}>()
const isActive: Ref<boolean> = ref(false)
const store = useWindowStore()
</script>
<template>
  <div
    class="absolute z-10 flex max-h-full max-w-full flex-col border border-violet-700 bg-cyan-200 p-1"
    :class="{ 'h-full': isActive, 'w-full': isActive, 'h-1/2': !isActive, 'w-1/2': !isActive }"
    v-show="store.isOpen"
  >
    <div
      class="flex max-h-8 select-none place-content-between border border-violet-700 bg-fuchsia-200 p-1 font-Dinkie"
    >
      <p class="w-fit text-nowrap">{{ props.title }}</p>
      <div class="flex h-full space-x-1">
        <IconMinimize :width="24" :height="24" />
        <IconMaximize @click="isActive = !isActive" :width="24" :height="24" />
        <RouterLink to="/">
          <IconClose :width="24" :height="24" @click="store.isOpen = false" />
        </RouterLink>
      </div>
    </div>
    <div
      class="flex h-full max-w-full flex-col flex-wrap overflow-auto border border-violet-700 bg-fuchsia-50 p-1 font-Dinkie text-indigo-700"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
