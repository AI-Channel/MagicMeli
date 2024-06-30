<script setup lang="ts">
import BreadcrumbNav from './BreadcrumbNav.vue'
import IconBackward from '@/components/icons/IconBackward.vue'
import ImageUpload from './ImageUpload.vue'
import { defineAsyncComponent } from 'vue'
import { useArticleStore } from '@/stores/store'
const FilterShowCase = new Set(['articles', 'deleted', 'draft'])
const ImageUploadShowCase = new Set(['fanart'])
const ArticleFilter = defineAsyncComponent(() => import('@/components/window/ArticleFilter.vue'))

const store = useArticleStore()
</script>

<template>
  <div
    class="flex max-h-fit select-none place-content-between items-center space-x-1 border-x-[2px] border-themeViolet bg-themeFuchsia px-1 py-0.5 font-Dinkie dark:border-darkViolet dark:bg-darkViolet"
  >
    <div>
      <IconBackward :width="'2rem'" :height="'2rem'" @click="$router.back" class="cursor-pointer" />
    </div>
    <BreadcrumbNav />
    <ArticleFilter v-show="FilterShowCase.has($route.name?.toString() ?? '') && store.articleTags.length > 0" />
    <ImageUpload v-show="ImageUploadShowCase.has($route.name?.toString() ?? '')" />
  </div>
</template>

<style scoped></style>
