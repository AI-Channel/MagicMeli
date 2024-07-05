<script setup lang="ts">
  import ArticleList from '@/components/ArticleList.vue'
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { listQueryMode } from '@/models/article'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  const router = useRoute()
  const isShowList = computed<boolean>(() => {
    return router.meta.isListPageCheck === router.name ? true : false
  })
</script>

<template>
  <WindowContainer>
    <ArticleList v-if="isShowList" :show-mode="listQueryMode.draft" />
    <RouterView></RouterView>
  </WindowContainer>
</template>

<style scoped></style>
