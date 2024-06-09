<script setup lang="ts">
import { getArticleById } from '@/requests/article'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import FloatBar from '@/components/window/FloatBar.vue'
import { emptyArticle, type Article } from '@/models/article'
const route = useRoute()
const id = Number(route.params.id)
let article: Ref<Article> = ref(emptyArticle)
onMounted(async () => {
  article.value = await getArticleById(id)
})
function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <VMdPreview
      :text="article.content"
      class="article m-auto max-w-[700px] font-Fusion leading-8 text-themeViolet dark:text-darkViolet"
      @top="backToTop()"
    ></VMdPreview>
    <FloatBar />
  </div>
</template>

<style scoped></style>
