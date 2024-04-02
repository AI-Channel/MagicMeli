<script setup lang="ts">
import BreadcrumbNav from './BreadcrumbNav.vue'
import IconBackward from './icons/IconBackward.vue'
import IconClose from './icons/IconClose.vue'
import IconFliter from './icons/IconFliter.vue'
import IconMaximize from './icons/IconMaximize.vue'
import IconMinimize from './icons/IconMinimize.vue'
import { useWindowStore } from '@/stores/store'
const store = useWindowStore()
</script>

<template>
  <div
    class="absolute z-10 flex max-h-full max-w-full flex-col border border-themeViolet bg-cyan-200 p-1"
    :class="{
      'h-full': store.isMaximized,
      'w-full': store.isMaximized,
      'h-1/2': !store.isMaximized,
      'w-1/2': !store.isMaximized
    }"
  >
    <div
      class="flex max-h-8 select-none place-content-between border border-themeViolet bg-fuchsia-200 p-1 font-Dinkie"
    >
      <p class="max-w-fit overflow-clip text-ellipsis text-nowrap text-themeViolet">
        {{ $route.meta.title }}
      </p>
      <div class="flex h-full space-x-1">
        <IconMinimize :width="24" :height="24" />
        <IconMaximize @click="store.WindowResize()" :width="24" :height="24" />
        <RouterLink to="/home">
          <IconClose :width="24" :height="24" @click="store.WindowClose()" />
        </RouterLink>
      </div>
    </div>
    <div
      class="flex max-h-9 select-none place-content-between items-center space-x-1 border border-themeViolet bg-fuchsia-200 p-1 font-Dinkie"
    >
      <div>
        <IconBackward :width="24" :height="24" @click="$router.back" />
      </div>
      <BreadcrumbNav />
      <IconFliter :width="24" :height="24" :color="'#4D23CF'" />
    </div>
    <div
      class="flex h-full max-w-full flex-col flex-wrap overflow-auto border border-themeViolet bg-fuchsia-50 p-2 font-Dinkie text-themeViolet"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
