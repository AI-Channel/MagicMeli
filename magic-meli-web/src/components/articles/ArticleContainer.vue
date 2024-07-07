<script lang="ts" setup>
  import FloatBar from '@/components/window/FloatBar.vue'
  import { type ArticleViewResponse, emptyArticle } from '@/models/article'
  import { getArticleById } from '@/requests/article'
  import VMdPreview from '@kangc/v-md-editor/lib/preview'
  import { onBeforeMount, ref, type Ref } from 'vue'
  import VueEasyLightbox from 'vue-easy-lightbox'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const id = Number(route.params.id)
  let article: Ref<ArticleViewResponse> = ref(emptyArticle)
  onBeforeMount(async () => {
    article.value = await getArticleById(id)
  })
</script>

<template>
  <div>
    <VMdPreview
      :text="article.content"
      class="article m-auto max-w-[700px] font-Fusion leading-8 text-themeViolet dark:text-darkViolet"
    ></VMdPreview>
    <FloatBar />
    <VueEasyLightbox />
  </div>
</template>

<style scoped></style>
