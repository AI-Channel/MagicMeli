<script setup lang="ts">
interface routeItem {
  id: number
  name: string
  title: string
  brief?: string
}
let routeItems: routeItem[] = [
  {
    id: 0,
    name: 'cyberpunk',
    title: 'Cyberpunk Red',
    brief: 'A brief report of the 4th Corporate War'
  },
  {
    id: 1,
    name: 'icon',
    title: 'Icon Test',
    brief: 'Test of icons'
  }
]
</script>
<template>
  <div v-show="$route.meta.showMenu">
    <RouterLink v-for="item in routeItems" :key="item.id" :to="{ name: item.name }">
      <div class="text-xl">{{ item.title }}</div>
      <div>{{ item.brief }}</div>
      <hr />
    </RouterLink>
  </div>
  <RouterView></RouterView>
</template>

<style scoped></style>
