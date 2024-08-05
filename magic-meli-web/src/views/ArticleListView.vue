<script lang="ts" setup>
  import ArticleList from '@/components/articles/ArticleList.vue'
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { listQueryMode } from '@/models/article'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const showMode = computed(() => {
    switch (route.name) {
      case 'articles':
        return listQueryMode.published
      case 'deleted':
        return listQueryMode.deleted
      case 'draft':
        return listQueryMode.draft
      default:
        return listQueryMode.published
    }
  })
</script>

<template>
  <WindowContainer>
    <ArticleList v-if="$route.meta.isListShow" :show-mode="showMode" />
    <RouterView />
  </WindowContainer>
</template>

<style scoped></style>
