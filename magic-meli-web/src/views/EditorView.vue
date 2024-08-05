<script lang="ts" setup>
  import type { ArticleViewRequest, ArticleViewResponse } from '@/models/article'
  import { usersLevelStr } from '@/models/user'
  import { getArticleById, newArticle, updateArticleById } from '@/scripts/requests/article'
  import VMdEditor from '@kangc/v-md-editor'
  import { onBeforeMount, ref, type Ref } from 'vue'
  import { useRoute } from 'vue-router'
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { useUserStore } from '@/stores/store'
  import { autoToast, jwtDecode } from '@/scripts/libs'
  import ArticleEditForm from '@/components/articles/ArticleEditForm.vue'

  const route = useRoute()
  const userStore = useUserStore()

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
      title: (editor: { langConfig: { save: { toolbar: unknown } } }) => `${editor.langConfig.save.toolbar}（Ctrl+S）`,
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

  onBeforeMount(async () => {
    if (Number(route.query.id)) {
      article.value = await getArticleById(Number(route.query.id))
    }
  })
  async function saveArticle(isPublished: boolean) {
    try {
      const tokenInfo = jwtDecode(localStorage.getItem('token') ?? '')
      if (!tokenInfo) throw new Error('invalid token')
      let articleEcho: ArticleViewResponse
      const articleRequest: ArticleViewRequest = {
        title: article.value.title,
        content: article.value.content,
        summary: article.value.summary,
        author: tokenInfo ? tokenInfo.payload.userId : '',
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
      isPublished ? autoToast('保存成功', 'success') : autoToast('保存草稿成功', 'success')
      return articleEcho
    } catch (error) {
      if ((error as Error).message == 'Request failed with status code 401') {
        autoToast('未登录，无法保存', 'error')
        userStore.isLoggedIn = false
      }
    }
  }
</script>

<template>
  <WindowContainer>
    <ArticleEditForm v-model="article" />
    <VMdEditor
      v-model="article.content"
      :disabled-menus="[]"
      :include-level="[2, 3, 4]"
      :toolbar="customToolbar"
      height="100%"
      left-toolbar="undo redo clear|h bold italic strikethrough quote|ul ol table hr|link image code|tip emoji save"
    ></VMdEditor>
  </WindowContainer>
</template>

<style scoped></style>
