<script lang="ts" setup>
  import BreadcrumbNav from './BreadcrumbNav.vue'
  import IconBackward from '@/components/icons/IconBackward.vue'
  import { defineAsyncComponent } from 'vue'
  import { useArticleStore } from '@/stores/store'

  const FilterShowCase = new Set(['articles', 'deleted', 'draft'])
  const ArticleFilter = defineAsyncComponent(() => import('@/components/window/ArticleFilter.vue'))

  const store = useArticleStore()
</script>

<template>
  <div
    class="flex max-h-fit select-none place-content-between items-center space-x-1 border-x-[2px] border-themeViolet bg-themeFuchsia px-1 py-0.5 font-Dinkie dark:border-darkViolet dark:bg-darkViolet"
  >
    <div>
      <IconBackward :height="'2rem'" :width="'2rem'" class="cursor-pointer" @click="$router.back" />
    </div>
    <BreadcrumbNav />
    <ArticleFilter v-show="FilterShowCase.has($route.name?.toString() ?? '') && store.articleTags.length > 0" />
  </div>
</template>

<style scoped></style>
