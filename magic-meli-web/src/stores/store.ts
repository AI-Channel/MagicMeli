import { ref } from 'vue'
import { defineStore } from 'pinia'

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
