<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { type RouteLocationMatched, useRoute } from 'vue-router'

  const route = useRoute()

  let navTitle = computed(() => {
    const filteredRoute = ref(route.matched.filter((item) => item.name))
    return filteredRoute.value.map((item: RouteLocationMatched) => item.meta.title)
  })

  let navName = computed(() => {
    const filteredRoute = ref(route.matched.filter((item) => item.name))
    return filteredRoute.value.map((item: RouteLocationMatched) => item.name)
  })
</script>

<template>
  <nav
    class="w-full overflow-clip text-nowrap bg-windowFuchsia px-2 text-themeViolet dark:bg-darkWindowFuchsia dark:text-darkViolet"
  >
    <RouterLink to="/home">
      <span class="hover:text-activeFuchsia dark:hover:text-indigo-400">Windose:</span>
    </RouterLink>
    <RouterLink v-for="(item, index) in navName" :key="index" :to="{ name: item }">
      <span class="hover:text-activeFuchsia dark:hover:text-indigo-400">{{ '/' + navTitle[index] }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped></style>
