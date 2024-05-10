<script setup lang="ts">
import WindowHeadBar from './WindowHeadBar.vue'
import { useWindowStore } from '@/stores/store'
import { ref } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import WindowToolBar from './WindowToolBar.vue'

const store = useWindowStore()
let initialize = {
  initW: ref(window.innerWidth / 2),
  initH: ref(window.innerHeight / 2),
  x: ref(window.innerWidth / 4),
  y: ref(window.innerHeight / 4)
}
</script>

<template>
  <Vue3DraggableResizable
    :init-h="initialize.initH.value"
    :init-w="initialize.initW.value"
    :x="initialize.x.value"
    :y="initialize.y.value"
    :min-w="280"
    :min-h="200"
    :draggable="store.isMaximized ? false : true"
    :resizable="store.isMaximized ? false : true"
    class="fixed z-10 flex max-h-full max-w-full flex-col border-[2px] border-themeViolet bg-themeCyan p-1 dark:bg-darkThemeFuchsia"
    :style="store.isMaximized ? { width: 100 + '%', height: 100 + '%', top: 0, left: 0 } : {}"
  >
    <WindowHeadBar :title="$route.meta.title" />
    <WindowToolBar />
    <div
      class="h-full max-w-full overflow-auto border-[2px] border-themeViolet bg-windowFuchsia p-2 dark:border-darkViolet dark:bg-darkWindowFuchsia"
    >
      <slot></slot>
    </div>
  </Vue3DraggableResizable>
</template>

<style scoped></style>
