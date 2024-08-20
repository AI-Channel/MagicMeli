<script lang="ts" setup>
  import BreadcrumbNav from './BreadcrumbNav.vue'
  import IconBackward from '@/components/icons/IconBackward.vue'
  import { computed, defineAsyncComponent } from 'vue'
  import { useArticleStore } from '@/stores/store'
  import ArticleMetaSearch from './ArticleMetaSearch.vue'
  import { useRoute, useRouter } from 'vue-router'
  import IconHardDelete from '../icons/IconHardDelete.vue'
  import { clearArticlesRecycleBin } from '@/scripts/requests/article'

  const ArticleFilter = defineAsyncComponent(() => import('@/components/window/ArticleFilter.vue'))
  const articleStore = useArticleStore()
  const route = useRoute()
  const router = useRouter()
  const isSearchShow = computed(
    () => route.meta.isFilterShow && window.innerWidth > 800 && articleStore.currentArticleListLength > 0
  )
  const isClearShow = computed(() => route.meta.isClearShow && articleStore.currentArticleListLength > 0)
  const clearRecycleBin = async () => {
    if (confirm('确定要清空回收站吗？')) {
      await clearArticlesRecycleBin()
      articleStore.currentArticleListLength = 0
      router.replace({ name: 'deleted' })
    }
  }
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
    <ArticleMetaSearch v-show="isSearchShow" />
    <button v-if="isClearShow" @click="clearRecycleBin()">
      <IconHardDelete :width="24" :height="24" />
    </button>
    <ArticleFilter v-show="$route.meta.isFilterShow && articleStore.articleTags.length > 0" />
  </div>
</template>

<style scoped></style>
