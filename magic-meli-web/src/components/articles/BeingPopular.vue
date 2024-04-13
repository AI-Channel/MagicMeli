<script setup lang="ts">
import { getArticleByQuery } from '@/scripts/articleInfo'
import VMdPreview from '@kangc/v-md-editor/lib/preview'

const article = getArticleByQuery('being popular')
const articleHtml = article?._content
const articleTags = article?._tags
</script>

<template>
  <VMdPreview :text="articleHtml" class="m-auto max-w-[750px] font-Fusion leading-7"></VMdPreview>
  <hr class="mx-auto my-4 max-w-[750px]" />
  <div class="m-auto max-w-[750px] font-Fusion leading-7">
    <span>Tags: </span>
    <span v-for="tag in articleTags" :key="tag" class="mx-1">
      {{ tag }}
    </span>
  </div>
</template>

<style scoped></style>
