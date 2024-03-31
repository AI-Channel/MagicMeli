<script setup lang="ts">
import IconClose from './icons/IconClose.vue'
import IconMaximize from './icons/IconMaximize.vue'
import IconMinimize from './icons/IconMinimize.vue'
import { useWindowStore } from '@/stores/store'
const store = useWindowStore()
</script>

<template>
  <div
    class="absolute z-10 flex max-h-full max-w-full flex-col border border-violet-700 bg-cyan-200 p-1"
    :class="{
      'h-full': store.isActive,
      'w-full': store.isActive,
      'h-1/2': !store.isActive,
      'w-1/2': !store.isActive
    }"
    v-show="store.isOpen"
  >
    <div
      class="flex max-h-8 select-none place-content-between border border-violet-700 bg-fuchsia-200 p-1 font-Dinkie"
    >
      <p class="text-themeViolet w-fit text-nowrap">{{ $route.meta.title }}</p>
      <div class="flex h-full space-x-1">
        <IconMinimize :width="24" :height="24" />
        <IconMaximize @click="store.WindowResize()" :width="24" :height="24" />
        <RouterLink to="/">
          <IconClose :width="24" :height="24" @click="store.WindowClose()" />
        </RouterLink>
      </div>
    </div>
    <div
      class="text-themeViolet flex h-full max-w-full flex-col flex-wrap overflow-auto border border-violet-700 bg-fuchsia-50 p-1 font-Dinkie"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
