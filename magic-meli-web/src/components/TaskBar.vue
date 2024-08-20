<script lang="ts" setup>
  import { useTaskBarStore } from '@/stores/store'
  import IconWindose from './icons/IconWindose.vue'
  import type { routeInfo } from '@/models/tasks'
  import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
  const taskBarStore = useTaskBarStore()
  const taskBarRouteInfo = (value: routeInfo) => {
    if (value.name) {
      const info: RouteLocationAsRelativeGeneric = { name: value.name, params: value.params, query: value.query }
      return info
    } else {
      const info: RouteLocationAsPathGeneric = { path: value.path, query: value.query }
      return info
    }
  }
</script>

<template>
  <footer
    class="h-10 flex-shrink-0 select-none items-center gap-x-1 bg-themeFuchsia px-2 py-1 font-Dinkie text-themeViolet shadow-md shadow-black dark:bg-darkThemeFuchsia dark:text-darkViolet"
  >
    <button class="taskBtn my-1 flex w-40 gap-x-7">
      <IconWindose :width="32" :height="24" />
      开始
    </button>
    <hr class="taskHr" />
    <div class="flex w-full gap-x-1">
      <RouterLink
        v-for="(item, key) in taskBarStore.getTaskBar()"
        :key="key"
        class="taskBtn my-1 flex w-full gap-x-1 before:content-['■']"
        :to="taskBarRouteInfo(item)"
      >
        {{ item.meta ? item.meta.title : '未命名' }}
      </RouterLink>
    </div>
    <hr class="taskHr" />
    <button class="taskBtn w-16" @click="taskBarStore.taskBarStorage.clear()">Clear</button>
  </footer>
</template>

<style scoped></style>
