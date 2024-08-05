<script lang="ts" setup>
  import WindowHeadBar from './WindowHeadBar.vue'
  import { useWindowStore } from '@/stores/store'
  import { computed, ref } from 'vue'
  import Vue3DraggableResizable from 'vue3-draggable-resizable'
  import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
  import WindowToolBar from './WindowNavBar.vue'

  const store = useWindowStore()
  let initialize = {
    initW: ref(window.innerWidth / 2),
    initH: ref(window.innerHeight / 1.5),
    x: ref(window.innerWidth / 4),
    y: ref(window.innerHeight / 6)
  }
  const height = computed(() => document.getElementsByClassName('desktop')[0].clientHeight)

  if (window.innerWidth <= 800) store.isMaximized = true
</script>

<template>
  <Vue3DraggableResizable
    :draggable="!store.isMaximized"
    :init-h="initialize.initH.value"
    :init-w="initialize.initW.value"
    :min-h="500"
    :min-w="500"
    :resizable="!store.isMaximized"
    :style="store.isMaximized ? { width: 100 + '%', height: height + 'px', top: 0, left: 0 } : {}"
    :x="initialize.x.value"
    :y="initialize.y.value"
    class="z-10 flex max-h-full max-w-full flex-col border-[2px] border-themeViolet bg-themeCyan p-1 dark:bg-darkThemeFuchsia"
  >
    <WindowHeadBar :title="$route.meta.title as string" />
    <WindowToolBar />
    <article
      class="h-full max-w-full overflow-y-auto overflow-x-hidden border-[2px] border-themeViolet bg-windowFuchsia p-2 dark:border-darkViolet dark:bg-darkWindowFuchsia"
    >
      <slot></slot>
    </article>
  </Vue3DraggableResizable>
</template>

<style scoped></style>
