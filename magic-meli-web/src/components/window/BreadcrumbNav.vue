<script lang="ts" setup></script>

<template>
  <nav
    class="flex h-7 w-full items-center overflow-clip text-nowrap bg-windowFuchsia px-2 text-themeViolet dark:bg-darkWindowFuchsia dark:text-darkViolet"
  >
    <RouterLink to="/home">
      <span class="hover:text-activeFuchsia dark:hover:text-indigo-400">Windose:</span>
    </RouterLink>
    <RouterLink v-for="(item, index) in $route.matched" :key="index" :to="{ name: item.name }">
      <span class="hover:text-activeFuchsia dark:hover:text-indigo-400">{{ '/' + item.meta.title }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped></style>
