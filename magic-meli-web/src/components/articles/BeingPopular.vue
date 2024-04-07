<script setup lang="ts">
import ArticleContainer from '@/components/ArticleContainer.vue'
import { GetArticleContent } from '@/scripts/articleInfo'
const articleHtml = GetArticleContent('being popular')
</script>

<template>
  <ArticleContainer :source="articleHtml" />
</template>

<style scoped></style>
