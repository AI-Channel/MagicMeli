<script setup lang="ts">
import ArticleList from '@/components/ArticleList.vue'
import WindowContainer from '@/components/WindowContainer.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const router = useRoute()
const isShowList = computed<Boolean>(() => {
  return router.meta.isSecondary === router.name ? true : false
})
</script>
<template>
  <WindowContainer>
    <ArticleList v-if="isShowList" />
    <RouterView></RouterView>
  </WindowContainer>
</template>

<style scoped></style>
