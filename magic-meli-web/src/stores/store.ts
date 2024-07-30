import { isSubsetOf } from '@/scripts/libs'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

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
  const articleMount: number = 0
  const articleTags: string[] = []
  const checkedTags: Ref<Set<string>> = ref(new Set<string>())

  function isAllCheckedTagsIn(tags: Set<string> | undefined) {
    return isSubsetOf(checkedTags.value, tags)
  }

  return {
    articleMount,
    articleTags,
    checkedTags,
    isAllCheckedTagsIn
  }
})

export const useUserStore = defineStore('user', () => {
  const isLoggedIn: Ref<boolean> = ref(false)
  const userId: Ref<string> = ref('')
  return { isLoggedIn, userId }
})
