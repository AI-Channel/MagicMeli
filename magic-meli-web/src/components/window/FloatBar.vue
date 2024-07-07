<script setup lang="ts">
  import { useUserStore } from '@/stores/store'
  import IconEdit from '../icons/IconEdit.vue'
  import { switchTheme } from '@/scripts/libs'
  import NightDaySwap from '../templates/NightDaySwap.vue'
  const userStore = useUserStore()
</script>

<template>
  <nav class="absolute bottom-8 right-8 flex flex-col gap-y-3">
    <RouterLink :to="{ name: 'markdown editor', query: { id: $route.params.id } }">
      <IconEdit v-if="userStore.isLoggedIn" class="opacity-30 hover:opacity-100" :width="24" :height="24" />
    </RouterLink>
    <NightDaySwap class="opacity-30 hover:opacity-100" @switch-theme="switchTheme()" />
  </nav>
</template>

<style scoped></style>
