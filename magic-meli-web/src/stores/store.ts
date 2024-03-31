import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWindowStore = defineStore('window', () => {
  const isOpen = ref(false)
  const isActive = ref(false)
  function WindowResize() {
    isActive.value = !isActive.value
  }
  function WindowClose() {
    isOpen.value = false
    isActive.value = false
  }
  return { isOpen, WindowClose, isActive, WindowResize}
})
