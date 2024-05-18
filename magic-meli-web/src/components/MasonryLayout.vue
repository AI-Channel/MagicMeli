<script setup lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'
import { ref } from 'vue'
import { type imgObj } from '@/scripts/imageinfo'
import { shuffle } from '@/scripts/libs'

const visibleRef = ref(false)
const indexRef = ref<number>()
const props = defineProps<{
  images: imgObj[]
}>()
const onShow = (index: number) => {
  visibleRef.value = true
  indexRef.value = index
}
const onHide = () => (visibleRef.value = false)
const shuffledImages = shuffle(props.images)
</script>

<template>
  <div class="m-auto max-w-full select-none columns-sm overflow-auto">
    <img
      v-for="(img, index) in shuffledImages"
      class="h-auto max-w-full py-2"
      loading="lazy"
      :key="index"
      :alt="'img' + index"
      @click="onShow(index)"
      :src="img.src"
    />
    <VueEasyLightbox :visible="visibleRef" :imgs="shuffledImages" :index="indexRef" :loop="true" @hide="onHide"> </VueEasyLightbox>
  </div>
</template>

<style scoped></style>
