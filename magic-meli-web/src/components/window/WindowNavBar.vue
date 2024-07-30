<script lang="ts" setup>
  import BreadcrumbNav from './BreadcrumbNav.vue'
  import IconBackward from '@/components/icons/IconBackward.vue'
  import { computed, defineAsyncComponent } from 'vue'
  import { useArticleStore } from '@/stores/store'
  import ArticleMetaSearch from './ArticleMetaSearch.vue'
  import { useRoute } from 'vue-router'

  const ArticleFilter = defineAsyncComponent(() => import('@/components/window/ArticleFilter.vue'))
  const store = useArticleStore()
  const route = useRoute()
  const isSearchShow = computed(() => route.meta.isFilterShow && window.innerWidth > 800 && store.articleMount > 0)
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
    <ArticleMetaSearch v-if="isSearchShow" />
    <ArticleFilter v-show="$route.meta.isFilterShow && store.articleTags.length > 0" />
  </div>
</template>

<style scoped></style>
