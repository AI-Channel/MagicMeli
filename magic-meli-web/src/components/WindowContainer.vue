<script setup lang="ts">
import ArticleFliter from './ArticleFliter.vue'
import BreadcrumbNav from './BreadcrumbNav.vue'
import WindowHeadBar from './WindowHeadBar.vue'
import IconBackward from './icons/IconBackward.vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { useWindowStore } from '@/stores/store'
import { ref } from 'vue'
const store = useWindowStore()
let initialize = {
  initW: ref(window.innerWidth / 2),
  initH: ref(window.innerHeight / 2),
  x: window.innerWidth / 4,
  y: window.innerHeight / 4
}
</script>

<template>
  <Vue3DraggableResizable
    :init-h="initialize.initH.value"
    :init-w="initialize.initW.value"
    :x="initialize.x"
    :y="initialize.y"
    :min-w="280"
    :min-h="200"
    :draggable="store.isMaximized ? false : true"
    :resizable="store.isMaximized ? false : true"
    :parent="true"
    class="fixed z-10 flex max-h-full max-w-full flex-col border-[2px] border-themeViolet bg-themeCyan p-1 dark:bg-darkThemeFuchsia"
    :style="store.isMaximized ? { width: 100 + '%', height: 100 + '%', top: 0, left: 0 } : {}"
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
      class="flex h-full max-w-full flex-col flex-wrap overflow-auto border-[2px] border-themeViolet bg-windowFuchsia p-2 text-themeViolet dark:border-darkViolet dark:bg-darkWindowFuchsia dark:text-darkViolet"
    >
      <slot></slot>
    </div>
  </Vue3DraggableResizable>
  <!-- <div
      class="fixed z-10 flex max-h-full max-w-full flex-col border-[2px] border-themeViolet bg-themeCyan p-1 dark:bg-darkThemeFuchsia"
      :class="{
        'h-full': store.isMaximized,
        'w-full': store.isMaximized,
        'h-1/2': !store.isMaximized,
        'w-1/2': !store.isMaximized
      }"
    ></div> -->
</template>

<style scoped></style>
