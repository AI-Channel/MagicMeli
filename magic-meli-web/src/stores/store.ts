import { listQueryMode } from '@/models/article'
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
  const status = listQueryMode.published
  const articleTags = ['']
  const checkedTags: Ref<Set<string>> = ref(new Set<string>())

  function isAllCheckedTagsIn(tags: Set<string> | undefined) {
    return isSubsetOf(checkedTags.value, tags)
  }

  return {
    status,
    articleTags,
    checkedTags,
    isAllCheckedTagsIn
  }
})

export const useUserStore = defineStore('user', () => {
  const token: Ref<string | null> = ref('')
  const isVerified: Ref<boolean> = ref(false)
  function setToken(Tokenvalue: string | null) {
    token.value = Tokenvalue
  }
  return { token, isVerified, setToken }
})
