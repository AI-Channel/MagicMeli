<script lang="ts" setup>
  import BreadcrumbNav from './BreadcrumbNav.vue'
  import IconBackward from '@/components/icons/IconBackward.vue'
  import { defineAsyncComponent } from 'vue'
  import { useArticleStore } from '@/stores/store'

  const ArticleFilter = defineAsyncComponent(() => import('@/components/window/ArticleFilter.vue'))
  const store = useArticleStore()
</script>

<template>
  <div
    class="flex h-10 select-none place-content-between items-center space-x-1 border-x-2 border-themeViolet bg-themeFuchsia px-1 py-0.5 font-Dinkie dark:border-darkViolet dark:bg-darkViolet"
  >
    <button>
      <IconBackward :height="'2rem'" :width="'2rem'" class="block cursor-pointer" @click="$router.back" />
      <span class="sr-only">后退</span>
    </button>
    <BreadcrumbNav />
    <ArticleFilter v-show="$route.meta.isFilterShow && store.articleTags.length > 0" />
  </div>
</template>

<style scoped></style>
