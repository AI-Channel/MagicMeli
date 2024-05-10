<script setup lang="ts">
import { getArticleById } from '@/scripts/article'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = Number(route.params.id)
let content: Ref<string> = ref('')
onMounted(async () => {
  content.value = (await getArticleById(id)).content
})
</script>

<template>
  <VMdPreview
    :text="content"
    class="article m-auto max-w-[700px] font-Fusion leading-8 text-themeViolet dark:text-darkViolet"
  ></VMdPreview>
</template>

<style scoped></style>
