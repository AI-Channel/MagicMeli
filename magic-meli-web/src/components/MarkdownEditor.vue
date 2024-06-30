<script setup lang="ts">
import type { ArticleViewRequest, ArticleViewResponse } from '@/models/article'
import { usersLevelStr } from '@/models/user'
import { getArticleById, newArticle, updateArticleById } from '@/requests/article'
import VMdEditor from '@kangc/v-md-editor'
import { defineAsyncComponent, onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast, type ToastOptions } from 'vue3-toastify'
import WindowContainer from './window/WindowContainer.vue'

const ArticleEditForm = defineAsyncComponent(() => import('@/components/ArticleEditForm.vue'))

const route = useRoute()

let article: Ref<ArticleViewResponse> = ref({
  id: 0,
  title: '',
  author: '',
  summary: '',
  category: '',
  tags: [],
  content: '',
  isDeleted: false,
  isPublished: false,
  updateTime: new Date().toISOString(),
  permission: usersLevelStr.guest
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
          saveArticle(false)
        }
      },
      {
        name: 'saveArticle',
        text: '保存文章',
        action() {
          saveArticle(true)
        }
      }
    ]
  }
}

onMounted(async () => {
  if (Number(route.query.id)) {
    article.value = await getArticleById(Number(route.query.id))
    if (article.value.isPublished) article.value.isPublished = true
    else article.value.isPublished = false
  }
})

async function saveArticle(isPublished: boolean) {
  let articleEcho: ArticleViewResponse
  const articleRequest: ArticleViewRequest = {
    title: article.value.title,
    content: article.value.content,
    summary: article.value.summary,
    author: article.value.author,
    category: article.value.category,
    tags: article.value.tags,
    isPublished: isPublished,
    permission: article.value.permission
  }
  if (article.value.id == 0) {
    articleEcho = await newArticle(articleRequest)
  } else {
    articleEcho = await updateArticleById(article.value.id, articleRequest)
  }
  isPublished
    ? toast.success('保存成功', {
        position: toast.POSITION.TOP_CENTER
      } as ToastOptions)
    : toast.success('保存草稿成功', {
        position: toast.POSITION.TOP_CENTER
      } as ToastOptions)
  return articleEcho
}

// function handleUploadImage(event: Event, insertImage: any, files: FileWithHandle[]) {
//   const reg: RegExp = /data:.*base64,/
//   let base64Data: string = ''
//   const reader = new FileReader()
//   reader.readAsDataURL(files[0])
//   reader.onload = (event) => {
//     base64Data = event.target?.result?.toString().replace(reg, '') ?? ''
//     const imgInfo: Image = {
//       title: files[0].name,
//       description: '',
//       imageDataBase64: base64Data
//     }
//     uploadImageBase64(imgInfo)
//   }
//   insertImage({
//     url: `http://localhost:5000/image/079e7569-59ad-4e5b-9795-d1d99f9c7dc6/raw`,
//     desc: 'desc1'
//   })
// }
</script>

<template>
  <WindowContainer>
    <ArticleEditForm v-model="article" />
    <VMdEditor
      v-model="article.content"
      left-toolbar="undo redo clear|h bold italic strikethrough quote|ul ol table hr|link image code|tip emoji save"
      :toolbar="customToolbar"
      :disabled-menus="[]"
      height="100%"
      :include-level="[2, 3, 4]"
    ></VMdEditor>
  </WindowContainer>
</template>

<style scoped></style>
