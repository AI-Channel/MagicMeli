import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWindowStore = defineStore('counter', () => {
  const isOpen = ref(false)
  function windowClose() {
    isOpen.value = false
  }
  
  return { isOpen, windowClose }
})
