import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { GetAllTags } from '@/scripts/articleInfo'
import { isSubsetOf } from '@/scripts/libs'

export const useWindowStore = defineStore('window', () => {
  const isMaximized = ref(false)
  function WindowResize() {
    isMaximized.value = !isMaximized.value
  }
  function WindowClose() {
    isMaximized.value = false
  }
  return { WindowClose, isMaximized, WindowResize }
})

export const useTagStore = defineStore('tag', () => {
  const articleTags = GetAllTags()
  const checkedTags: Ref<Set<string>> = ref(new Set())
  function TagIsChecked(tag: string) {
    return checkedTags.value.has(tag)
  }
  function IsAllCheckedTagsIn(tags: Ref<Set<string>> | undefined) {
    return isSubsetOf(checkedTags.value, tags?.value)
  }
  return { articleTags, checkedTags, TagIsChecked, IsAllCheckedTagsIn }
})
