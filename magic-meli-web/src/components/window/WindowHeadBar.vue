<script lang="ts" setup>
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
    class="flex h-10 select-none place-content-between items-center border-2 border-themeViolet bg-themeFuchsia p-1 font-Dinkie dark:border-darkViolet dark:bg-darkViolet"
  >
    <p
      class="max-w-fit overflow-clip text-ellipsis text-nowrap text-themeViolet before:mx-1 before:content-['■'] dark:text-white"
    >
      {{ props.title }}
    </p>
    <nav class="flex h-full items-center gap-x-1">
      <IconMinimize :height="24" :width="24" />
      <IconMaximize :height="24" :width="24" class="cursor-pointer" @click="store.windowResize()" />
      <IconClose
        :height="24"
        :width="24"
        class="cursor-pointer"
        @click="store.windowClose(), $router.push({ path: '/home' })"
      />
    </nav>
  </div>
</template>

<style scoped></style>
