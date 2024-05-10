<script setup lang="ts">
import type { Article } from '@/models/article'
import Vue3TagsInput from 'vue3-tags-input'

const article = defineModel<Article>({
  default: {
    id: 0,
    title: '',
    content: '',
    tags: []
  }
})
</script>

<template>
  <form
    class="my-2 grid grid-cols-2 grid-rows-4 gap-2 font-Fusion text-themeViolet dark:text-darkViolet"
  >
    <label class="flex content-center">
      <span class="m-auto min-w-20">标题：</span>
      <input
        id="title"
        type="text"
        class="h-fit w-full whitespace-pre-wrap break-words py-1 focus:ring-themeViolet dark:focus:ring-darkViolet"
        placeholder="文章标题"
        v-model.trim="article.title"
      />
    </label>
    <label class="row-span-4 flex h-full">
      <span class="m-auto min-w-20">简介:</span>
      <textarea
        id="summary"
        class="w-full whitespace-pre-wrap break-words focus:ring-themeViolet dark:focus:ring-darkViolet"
        placeholder="文章简介"
        v-model="article.summary"
      ></textarea>
    </label>
    <label class="flex content-center">
      <span class="m-auto min-w-20">作者：</span>
      <input
        id="title"
        class="h-fit w-full whitespace-pre-wrap break-words py-1 focus:ring-themeViolet dark:focus:ring-darkViolet"
        placeholder="文章作者"
        v-model.trim="article.author"
      />
    </label>
    <label class="flex content-center">
      <span class="m-auto min-w-20">分类：</span>
      <input
        id="title"
        class="h-fit w-full whitespace-pre-wrap break-words py-1 focus:ring-themeViolet dark:focus:ring-darkViolet"
        placeholder="文章分类"
        v-model.trim="article.category"
      />
    </label>
    <label class="flex content-center">
      <span class="m-auto min-w-20">标签：</span>
      <Vue3TagsInput
        v-model:tags="article.tags"
        class="h-fit w-full"
        @on-tags-changed="
          (tags: string[]) => {
            article.tags = tags
          }
        "
      />
    </label>
  </form>
</template>

<style scoped>
:deep(.v3ti .v3ti-tag) {
  background: #eaa0e8;
  border-radius: 0.2rem;
}
</style>
