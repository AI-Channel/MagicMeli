<script lang="ts" setup>
  import IconEdit from '../icons/IconEdit.vue'
</script>

<template>
  <nav class="absolute bottom-8 right-8 flex flex-col gap-y-3 opacity-30 hover:opacity-100">
    <RouterLink :to="{ name: 'markdown editor', query: { id: $route.params.id } }">
      <IconEdit :height="24" :width="24" />
    </RouterLink>
  </nav>
</template>

<style scoped></style>
