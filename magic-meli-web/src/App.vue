<script setup lang="ts">
import BackgroundImage from './components/BackgroundImage.vue'
import DesktopIcon from './components/DesktopIcon.vue'
import IconArticle from './components/icons/IconArticle.vue'
</script>

<template>
  <BackgroundImage />
  <div
    class="absolute inset-0 m-auto grid max-h-fit max-w-full grid-flow-row grid-cols-3 grid-rows-9 place-items-center gap-8 place-self-stretch py-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-flow-col lg:grid-cols-9 lg:gap-4 xl:grid-cols-12"
  >
    <DesktopIcon title="文章列表">
      <IconArticle />
    </DesktopIcon>
  </div>
</template>

<style scoped></style>
