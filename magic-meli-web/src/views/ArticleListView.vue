<script lang="ts" setup>
  import ArticleList from '@/components/articles/ArticleList.vue'
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { listQueryMode } from '@/models/article'
</script>

<template>
  <WindowContainer>
    <ArticleList v-if="$route.meta.isListShow" :show-mode="listQueryMode.published" />
    <RouterView />
  </WindowContainer>
</template>

<style scoped></style>
