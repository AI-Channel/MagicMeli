<script lang="ts" setup>
  import { useTaskBarStore, useWindowStore } from '@/stores/store'
  import IconClose from '@/components/icons/IconWindowClose.vue'
  import IconMaximize from '@/components/icons/IconMaximize.vue'
  import IconMinimize from '@/components/icons/IconMinimize.vue'
  import { useRoute, useRouter } from 'vue-router'

  const props = defineProps<{
    title: string
  }>()
  const route = useRoute()
  const router = useRouter()
  const windowStore = useWindowStore()
  const taskBarStore = useTaskBarStore()
  const handleMinimize = () => {
    windowStore.isMaximized = false
    taskBarStore.addToTaskBar({
      name: route.name,
      path: route.path,
      params: route.params,
      query: route.query,
      meta: route.meta
    })
    router.replace({ path: '/home' })
  }
  const handleClose = () => {
    windowStore.isMaximized = false
    taskBarStore.delFromTaskBar({
      name: route.name,
      path: route.path,
      params: route.params,
      query: route.query,
      meta: route.meta
    })
    router.replace({ path: '/home' })
  }
</script>

<template>
  <div
    class="flex h-10 select-none place-content-between items-center border-2 border-themeViolet bg-themeFuchsia p-1 font-Dinkie dark:border-darkViolet dark:bg-darkViolet"
  >
    <p
      class="max-w-fit overflow-clip text-ellipsis text-nowrap text-themeViolet before:mx-1 before:content-['■'] dark:text-white"
    >
      {{ props.title }}
    </p>
    <nav class="flex h-full items-center gap-x-1">
      <button @click="handleMinimize()">
        <IconMinimize :height="24" :width="24" />
      </button>
      <button @click="windowStore.isMaximized = !windowStore.isMaximized">
        <IconMaximize :height="24" :width="24" class="cursor-pointer" />
        <span class="sr-only">最大化或还原</span>
      </button>
      <button @click="handleClose()">
        <IconClose :height="24" :width="24" class="cursor-pointer" />
        <span class="sr-only">关闭</span>
      </button>
    </nav>
  </div>
</template>

<style scoped></style>
