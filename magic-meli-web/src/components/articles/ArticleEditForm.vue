<script lang="ts" setup>
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
    class="my-2 mb-3 grid grid-cols-2 grid-rows-3 gap-2 border-b border-themeViolet pb-3 font-Fusion text-themeViolet dark:border-darkViolet dark:text-darkViolet"
  >
    <label class="flex content-center">
      <span class="m-auto min-w-20 select-none">标题：</span>
      <input
        id="title"
        v-model.trim="article.title"
        class="my-auto h-fit w-full whitespace-pre-wrap break-words border border-themeViolet px-3 py-1 outline-themeViolet dark:border-darkViolet dark:outline-darkViolet"
        placeholder="文章标题"
        required
        type="text"
      />
    </label>
    <label class="row-span-3 flex h-full">
      <span class="m-auto min-w-20 select-none">简介:</span>
      <textarea
        id="summary"
        v-model="article.summary"
        class="my-auto h-full min-h-24 w-full select-none whitespace-pre-wrap break-words border border-themeViolet p-2 outline-themeViolet dark:border-darkViolet dark:outline-darkViolet"
        placeholder="文章简介"
      ></textarea>
    </label>
    <label class="flex content-center">
      <span class="m-auto min-w-20 select-none">分类：</span>
      <input
        id="title"
        v-model.trim="article.category"
        class="my-auto h-fit w-full whitespace-pre-wrap break-words border border-themeViolet px-3 py-1 outline-themeViolet dark:outline-darkViolet"
        placeholder="文章分类"
        required
      />
    </label>
    <label class="flex content-center">
      <span class="m-auto min-w-20 select-none">标签：</span>
      <Vue3TagsInput
        v-model:tags="article.tags"
        class="my-auto h-fit w-full p-2"
        placeholder="请输入标签"
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
