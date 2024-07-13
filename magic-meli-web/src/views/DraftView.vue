<script lang="ts" setup>
  import ArticleList from '@/components/ArticleList.vue'
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { listQueryMode } from '@/models/article'
</script>

<template>
  <WindowContainer>
    <ArticleList v-if="$route.meta.isListShow" :show-mode="listQueryMode.draft" />
    <RouterView></RouterView>
  </WindowContainer>
</template>

<style scoped></style>
