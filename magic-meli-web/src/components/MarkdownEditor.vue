<script setup lang="ts">
import type { Article } from '@/models/article'
import type { Image } from '@/models/image'
import { getArticleById, newArticle, updateArticle } from '@/requests/article'
import { uploadImageBase64 } from '@/requests/image'
import VMdEditor from '@kangc/v-md-editor'
import type { FileWithHandle } from 'browser-fs-access'
import { defineAsyncComponent, onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import WindowContainer from './window/WindowContainer.vue'

const ArticleEditForm = defineAsyncComponent(() => import('@/components/ArticleEditForm.vue'))

const route = useRoute()
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

const customToolbar = {
  save: {
    name: 'save',
    icon: 'v-md-icon-save',
    title: (editor: { langConfig: { save: { toolbar: any } } }) => `${editor.langConfig.save.toolbar}（Ctrl+S）`,
    menus: [
      {
        name: 'saveDraft',
        text: '保存草稿',
        action() {
          saveDraft()
        }
      },
      {
        name: 'saveArticle',
        text: '保存文章',
        action(editor: { save: () => void }) {
          editor.save()
        }
      }
    ]
  }
}

onMounted(async () => {
  if ((Number(route.query.id) ?? 0) != 0) {
    article.value = await getArticleById(Number(route.query.id))
    if (article.value.isPublished) article.value.isPublished = true
    else article.value.isPublished = false
  }
})

async function saveDraft() {
  article.value.isPublished = false
  if (article.value.id == 0) {
    articleEcho = await newArticle(article.value)
  } else {
    articleEcho = await updateArticle(article.value)
  }
  alert('保存草稿成功')
  return articleEcho
}

async function saveArticle() {
  article.value.isPublished = true
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
      left-toolbar="undo redo clear|h bold italic strikethrough quote|ul ol table hr|link image code|tip emoji save"
      :toolbar="customToolbar"
      @save="saveArticle()"
      :disabled-menus="[]"
      height="100%"
      :include-level="[2, 3, 4]"
      @upload-image="handleUploadImage"
    ></VMdEditor>
  </WindowContainer>
</template>

<style scoped></style>
