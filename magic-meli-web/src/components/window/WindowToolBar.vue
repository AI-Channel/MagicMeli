<script setup lang="ts">
import ArticleFilter from './ArticleFilter.vue'
import BreadcrumbNav from './BreadcrumbNav.vue'
import IconBackward from '@/components/icons/IconBackward.vue'
import ImageUpload from './ImageUpload.vue'
const FilterShowCase = new Set(['articles', 'recycle'])
const ImageUploadShowCase = new Set(['fanart'])
</script>

<template>
  <div
    class="flex max-h-9 select-none place-content-between items-center space-x-1 border-x-[2px] border-themeViolet bg-themeFuchsia p-1 font-Dinkie dark:border-darkViolet dark:bg-darkViolet"
  >
    <div>
      <IconBackward :width="24" :height="24" @click="$router.back" class="cursor-pointer" />
    </div>
    <BreadcrumbNav />
    <ArticleFilter v-show="FilterShowCase.has($route.name?.toString() ?? '')" />
    <ImageUpload v-show="ImageUploadShowCase.has($route.name?.toString() ?? '')" />
  </div>
</template>

<style scoped></style>
