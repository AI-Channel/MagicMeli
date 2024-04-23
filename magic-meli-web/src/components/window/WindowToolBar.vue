<script setup lang="ts">
import ArticleFilter from './ArticleFilter.vue'
import BreadcrumbNav from './BreadcrumbNav.vue'
import IconBackward from '@/components/icons/IconBackward.vue'
</script>

<template>
  <div
    class="flex max-h-9 select-none place-content-between items-center space-x-1 border-x-[2px] border-themeViolet bg-themeFuchsia p-1 font-Dinkie dark:border-darkViolet dark:bg-darkViolet"
  >
    <div>
      <IconBackward :width="24" :height="24" @click="$router.back" class="cursor-pointer" />
    </div>
    <BreadcrumbNav />
    <ArticleFilter
      v-if="$route.name === 'articles' || $route.name === 'recycle' || $route.name === 'test'"
    />
  </div>
</template>

<style scoped></style>
