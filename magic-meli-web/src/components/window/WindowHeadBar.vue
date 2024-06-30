<script setup lang="ts">
import { useWindowStore } from '@/stores/store'
import IconClose from '@/components/icons/IconClose.vue'
import IconMaximize from '@/components/icons/IconMaximize.vue'
import IconMinimize from '@/components/icons/IconMinimize.vue'
const props = defineProps<{
  title: string
}>()
const store = useWindowStore()
</script>

<template>
  <div
    class="flex max-h-9 select-none place-content-between items-center border-[2px] border-themeViolet bg-themeFuchsia p-1 font-Dinkie dark:border-darkViolet dark:bg-darkViolet"
  >
    <p class="max-w-fit overflow-clip text-ellipsis text-nowrap text-themeViolet before:mx-1 before:content-['■'] dark:text-white">
      {{ props.title }}
    </p>
    <div class="flex h-full">
      <IconMinimize :width="24" :height="24" />
      <IconMaximize @click="store.windowResize()" :width="24" :height="24" class="cursor-pointer" />
      <IconClose :width="24" :height="24" @click="store.windowClose(), $router.push({ path: '/home' })" class="cursor-pointer" />
    </div>
  </div>
</template>

<style scoped></style>
