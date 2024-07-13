<script lang="ts" setup>
  import { switchTheme } from '@/scripts/libs'
  import { useUserStore } from '@/stores/store'
  import IconBacktoTop from '../icons/IconBacktoTop.vue'
  import IconEdit from '../icons/IconEdit.vue'
  import NightDaySwap from '../templates/NightDaySwap.vue'
  const userStore = useUserStore()
  defineEmits(['BacktoTop'])
</script>

<template>
  <nav class="absolute bottom-8 right-8 grid grid-flow-row place-content-center place-items-center gap-y-3">
    <IconBacktoTop class="cursor-pointer opacity-30 hover:opacity-100" @click="$emit('BacktoTop')" />
    <NightDaySwap class="cursor-pointer opacity-30 hover:opacity-100" @switch-theme="switchTheme()" />
    <RouterLink :to="{ name: 'markdown editor', query: { id: $route.params.id } }">
      <IconEdit v-if="userStore.isLoggedIn" class="opacity-30 hover:opacity-100" :width="24" :height="24" />
    </RouterLink>
  </nav>
</template>

<style scoped></style>
