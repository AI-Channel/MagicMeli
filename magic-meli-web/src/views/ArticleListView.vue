<script lang="ts" setup>
  import ArticleList from '@/components/ArticleList.vue'
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { listQueryMode } from '@/models/article'
  import { RouterView, useRoute } from 'vue-router'
  import { computed } from 'vue'

  const router = useRoute()
  const isShowList = computed<boolean>(() => {
    return router.meta.isListPageCheck === router.name
  })
</script>

<template>
  <WindowContainer>
    <ArticleList v-if="isShowList" :show-mode="listQueryMode.published" />
    <RouterView />
  </WindowContainer>
</template>

<style scoped></style>
