import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Article, getAllTags } from '@/scripts/articleInfo'
import { isSubsetOf } from '@/scripts/libs'

export const useWindowStore = defineStore('window', () => {
  const isMaximized = ref(false)
  function windowResize() {
    isMaximized.value = !isMaximized.value
  }
  function windowClose() {
    isMaximized.value = false
  }
  return { windowClose, isMaximized, windowResize }
})

export const useArticleStore = defineStore('article', () => {
  const atricleContent = ''
  const articleTags = getAllTags()
  const checkedTags: Ref<Set<string>> = ref(new Set())
  function isAllCheckedTagsIn(tags: Set<string> | undefined) {
    return isSubsetOf(checkedTags.value, tags)
  }
  function isDeleted(article: Article) {
    return article._isDeleted.value
  }
  return { articleTags, checkedTags, atricleContent, isAllCheckedTagsIn, isDeleted }
})
