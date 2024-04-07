<script setup lang="ts">
import ArticleFliter from './ArticleFliter.vue'
import BreadcrumbNav from './BreadcrumbNav.vue'
import WindowHeadBar from './WindowHeadBar.vue'
import IconBackward from './icons/IconBackward.vue'

import { useWindowStore } from '@/stores/store'
const store = useWindowStore()
</script>

<template>
  <div
    class="absolute z-10 flex max-h-full max-w-full flex-col border-[2px] border-themeViolet bg-themeCyan p-1 dark:bg-darkThemeFuchsia"
    :class="{
      'h-full': store.isMaximized,
      'w-full': store.isMaximized,
      'h-1/2': !store.isMaximized,
      'w-1/2': !store.isMaximized
    }"
  >
    <WindowHeadBar :title="$route.meta.title" />
    <div
      class="flex max-h-9 select-none place-content-between items-center space-x-1 border-x-[2px] border-themeViolet bg-themeFuchsia p-1 font-Dinkie dark:border-darkViolet dark:bg-darkViolet"
    >
      <div>
        <IconBackward :width="24" :height="24" @click="$router.back" />
      </div>
      <BreadcrumbNav />
      <ArticleFliter v-if="$route.name === 'article'" />
    </div>
    <div
      class="flex h-full max-w-full flex-col flex-wrap overflow-auto border-[2px] border-themeViolet bg-windowFuchsia p-2 text-themeViolet dark:border-darkViolet dark:bg-darkWindowFuchsia"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
