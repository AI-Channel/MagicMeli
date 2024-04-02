<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

let navTitle = computed(() => {
  const filterdRoute = ref(route.matched.filter((item) => item.name))
  return filterdRoute.value.map((item: any) => item.meta.title)
})
let navName = computed(() => {
  const filterdRoute = ref(route.matched.filter((item) => item.name))
  return filterdRoute.value.map((item: any) => item.name)
})
</script>

<template>
  <p class="w-full bg-fuchsia-100 px-2 text-themeViolet">
    <RouterLink to="/home">
      <span class="hover:text-fuchsia-600">Windose:</span>
    </RouterLink>
    <RouterLink v-for="(item, index) in navName" :key="index" :to="{ name: item }">
      <span class="hover:text-fuchsia-600">{{ '/' + navTitle[index] }}</span>
    </RouterLink>
  </p>
</template>

<style scoped></style>
