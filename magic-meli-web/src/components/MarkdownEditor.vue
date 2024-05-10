<script setup lang="ts">
import type { Article } from '@/models/article'
import { getArticleById, newArticle, updateArticle } from '@/requests/article'
import VMdEditor from '@kangc/v-md-editor'
import { defineAsyncComponent, onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import WindowContainer from './window/WindowContainer.vue'
import type { FileWithHandle } from 'browser-fs-access'
import { uploadImageBase64 } from '@/requests/image'
import type { Image } from '@/models/image'

const ArticleEditForm = defineAsyncComponent(() => import('@/components/ArticleEditForm.vue'))

const route = useRoute()
const leftToolbar =
  'undo redo clear|h bold italic strikethrough quote|ul ol table hr|link image code|tip emoji save image'
let articleEcho: Article

let article: Ref<Article> = ref({
  id: 0,
  title: '',
  author: '',
  summary: '',
  category: '',
  tags: [],
  content: '',
  isDeleted: false,
  isPublished: false,
  updateTime: new Date().toISOString()
})

onMounted(async () => {
  if ((Number(route.query.id) ?? 0) != 0) {
    article.value = await getArticleById(Number(route.query.id))
  }
})

async function saveArticle() {
  if (article.value.id == 0) {
    articleEcho = await newArticle(article.value)
  } else {
    articleEcho = await updateArticle(article.value)
  }
  alert('保存成功')
  return articleEcho
}

function handleUploadImage(event: Event, insertImage: any, files: FileWithHandle[]) {
  const reg: RegExp = /data:.*base64,/
  let base64Data: string = ''
  const reader = new FileReader()
  reader.readAsDataURL(files[0])
  reader.onload = (event) => {
    base64Data = event.target?.result?.toString().replace(reg, '') ?? ''
    const imgInfo: Image = {
      title: files[0].name,
      description: '',
      imageDataBase64: base64Data
    }
    uploadImageBase64(imgInfo)
  }
  // insertImage({
  //   url: `http://localhost:5000/image/079e7569-59ad-4e5b-9795-d1d99f9c7dc6/raw`,
  //   desc: 'desc1'
  // })
}
</script>

<template>
  <WindowContainer>
    <ArticleEditForm v-model="article" />
    <VMdEditor
      v-model="article.content"
      :left-toolbar="leftToolbar"
      @save="saveArticle()"
      :disabled-menus="[]"
      height="100%"
      :include-level="[2, 3, 4]"
      @upload-image="handleUploadImage"
    ></VMdEditor>
  </WindowContainer>
</template>

<style scoped></style>
