<script setup lang="ts">
import type { ArticleViewResponse } from '@/models/article'
import Vue3TagsInput from 'vue3-tags-input'

const article = defineModel<ArticleViewResponse>({
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
    class="my-2 mb-3 grid grid-cols-2 grid-rows-4 gap-2 border-b border-themeViolet pb-3 font-Fusion text-themeViolet dark:border-darkViolet dark:text-darkViolet"
  >
    <label class="flex content-center">
      <span class="m-auto min-w-20">标题：</span>
      <input
        id="title"
        type="text"
        class="form-input my-auto h-fit w-full whitespace-pre-wrap break-words py-1 focus:ring-themeViolet dark:focus:ring-darkViolet"
        placeholder="文章标题"
        v-model.trim="article.title"
        required
      />
    </label>
    <label class="row-span-4 flex h-full">
      <span class="m-auto min-w-20">简介:</span>
      <textarea
        id="summary"
        class="form-textarea my-auto h-full w-full whitespace-pre-wrap break-words focus:ring-themeViolet dark:focus:ring-darkViolet"
        placeholder="文章简介"
        v-model="article.summary"
      ></textarea>
    </label>
    <label class="flex content-center">
      <span class="m-auto min-w-20">作者：</span>
      <input
        id="title"
        class="form-input my-auto h-fit w-full whitespace-pre-wrap break-words py-1 focus:ring-themeViolet dark:focus:ring-darkViolet"
        placeholder="文章作者"
        v-model.trim="article.author"
        required
      />
    </label>
    <label class="flex content-center">
      <span class="m-auto min-w-20">分类：</span>
      <input
        id="title"
        class="form-input my-auto h-fit w-full whitespace-pre-wrap break-words py-1 focus:ring-themeViolet dark:focus:ring-darkViolet"
        placeholder="文章分类"
        v-model.trim="article.category"
        required
      />
    </label>
    <label class="flex content-center">
      <span class="m-auto min-w-20">标签：</span>
      <Vue3TagsInput
        v-model:tags="article.tags"
        class="form-input my-auto h-fit w-full py-1"
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
