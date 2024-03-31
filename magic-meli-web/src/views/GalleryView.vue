<script setup lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'
import { ref } from 'vue'

const visibleRef = ref(false)
const indexRef = ref<number>()
const imgsRef = ref<string | string[]>([
  '/src/assets/graphs/101425220_p0.jpg',
  '/src/assets/graphs/101511197_p0.jpg',
  '/src/assets/graphs/101573875_p0.png',
  '/src/assets/graphs/101688803_p0.jpg',
  '/src/assets/graphs/101696251_p0.jpg',
  '/src/assets/graphs/104324115_p0.jpg',
  '/src/assets/graphs/104460706_p0.jpg',
  '/src/assets/graphs/104460706_p1.jpg'
])

const onShow = (index: number) => {
  visibleRef.value = true
  indexRef.value = index
}
const onHide = () => (visibleRef.value = false)
</script>

<template>
  <div class="m-auto max-w-full columns-sm overflow-auto select-none">
    <img
      v-for="(img, index) in imgsRef"
      class="py-2"
      :key="index"
      :alt="'img' + index"
      @click="onShow(index)"
      :src="img"
    />
    <vueEasyLightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      :loop="true"
      @hide="onHide"
    >
    </vueEasyLightbox>
  </div>
</template>

<style scoped></style>
