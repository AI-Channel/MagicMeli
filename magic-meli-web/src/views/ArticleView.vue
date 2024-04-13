<script setup lang="ts">
import ArticleList from '@/components/ArticleList.vue'
import WindowContainer from '@/components/window/WindowContainer.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const router = useRoute()
const isShowList = computed<Boolean>(() => {
  return router.meta.isListPageCheck === router.name ? true : false
})
</script>
<template>
  <WindowContainer>
    <KeepAlive>
      <ArticleList :show-mode="$route.name" v-if="isShowList" />
    </KeepAlive>
    <RouterView></RouterView>
  </WindowContainer>
</template>

<style scoped></style>
