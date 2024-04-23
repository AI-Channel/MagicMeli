<script setup lang="ts">
import type { Article } from '@/models/article'
import { getArticleById, newArticle, updateArticle } from '@/scripts/article'
import VMdEditor from '@kangc/v-md-editor'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import WindowContainer from './window/WindowContainer.vue'

const route = useRoute()
const leftToolbar =
  'undo redo clear|h bold italic strikethrough quote|ul ol table hr|link image code|tip emoji save'
let articleEcho: Article
let tagsString: Ref<string | undefined> = ref('')

let article: Ref<Article> = ref({
  id: 0,
  title: '',
  author: '',
  summary: '',
  category: '',
  tags: [],
  content: '',
  isDeleted: false,
  isPublished: true
})

onMounted(async () => {
  if (typeof route.query.id != 'undefined' && Number(route.query.id) != 0) {
    article.value = await getArticleById(Number(route.query.id))
    tagsString.value = article.value.tags?.join()
  }
})

async function saveArticle() {
  if (article.value.id == 0) {
    articleEcho = await newArticle(article.value)
  } else {
    articleEcho = await updateArticle(article.value)
  }
  return articleEcho
}
</script>

<template>
  <WindowContainer>
    <form class="my-2 grid grid-cols-2 grid-rows-4 gap-2 font-Fusion text-themeViolet dark:text-darkViolet">
      <label class="flex content-center">
        <span class="m-auto min-w-20">标题：</span>
        <input
          id="title"
          type="text"
          class="h-fit w-full whitespace-pre-wrap break-words py-1 focus:ring-themeViolet dark:focus:ring-darkViolet"
          placeholder="文章标题"
          v-model.trim="article.title"
        />
      </label>
      <label class="row-span-4 flex h-full">
        <span class="m-auto min-w-20">简介:</span>
        <textarea
          id="summary"
          class="w-full whitespace-pre-wrap break-words focus:ring-themeViolet dark:focus:ring-darkViolet"
          placeholder="文章简介"
          v-model="article.summary"
        ></textarea>
      </label>
      <label class="flex content-center">
        <span class="m-auto min-w-20">作者：</span>
        <input
          id="title"
          class="h-fit w-full whitespace-pre-wrap break-words py-1 focus:ring-themeViolet dark:focus:ring-darkViolet"
          placeholder="文章作者"
          v-model.trim="article.author"
        />
      </label>
      <label class="flex content-center">
        <span class="m-auto min-w-20">分类：</span>
        <input
          id="title"
          class="h-fit w-full whitespace-pre-wrap break-words py-1 focus:ring-themeViolet dark:focus:ring-darkViolet"
          placeholder="文章分类"
          v-model.trim="article.category"
        />
      </label>
      <label class="flex content-center">
        <span class="m-auto min-w-20">标签：</span>
        <input
          id="title"
          class="h-fit w-full whitespace-pre-wrap break-words py-1"
          placeholder="文章标签,输入使用英文逗号分隔"
          :value="tagsString"
          @input="
            (event: Event) => {
              tagsString = (event.target as HTMLInputElement).value
              article.tags = tagsString.split(',')
            }
          "
        />
      </label>
    </form>
    <VMdEditor
      v-model="article.content"
      :left-toolbar="leftToolbar"
      @save="saveArticle()"
      height="100%"
      :include-level="[2, 3, 4]"
    ></VMdEditor>
  </WindowContainer>
</template>

<style scoped></style>
