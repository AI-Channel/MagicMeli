import type { routeInfo } from '@/models/tasks'
import { isSubsetOf } from '@/scripts/libs'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useWindowStore = defineStore('window', () => {
  const isMaximized = ref(false)
  return { isMaximized }
})

export const useArticleStore = defineStore('article', () => {
  const articleMount: number = 0
  const articleTags: string[] = []
  const checkedTags: Ref<Set<string>> = ref(new Set<string>([]))

  function isContainAllCheckedTags(tags: Set<string> | undefined) {
    return isSubsetOf(checkedTags.value, tags)
  }

  return {
    articleMount,
    articleTags,
    checkedTags,
    isContainAllCheckedTags
  }
})

export const useUserStore = defineStore('user', () => {
  const isLoggedIn: Ref<boolean> = ref(false)
  const userId: Ref<string> = ref('')
  return { isLoggedIn, userId }
})

export const useTaskBarStore = defineStore('taskBar', () => {
  const taskBarStorage: Ref<Set<string>> = ref(new Set<string>([]))
  const isShowTaskBar: Ref<boolean> = ref(false)

  const addToTaskBar = (value: routeInfo) =>
    new Set<routeInfo>(Array.from(taskBarStorage.value.add(JSON.stringify(value))).map((item) => JSON.parse(item)))

  const delFromTaskBar = (value: routeInfo) => taskBarStorage.value.delete(JSON.stringify(value))

  const getTaskBar = () => new Set<routeInfo>(Array.from(taskBarStorage.value).map((item) => JSON.parse(item)))

  return { taskBarStorage, isShowTaskBar, addToTaskBar, delFromTaskBar, getTaskBar }
})
