import './assets/styles/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VMdEditor, VMdPreview } from './scripts/mdRenderer'

import axios from '@/requests/axiosInstance'
import Vue3Toastify, { Bounce, type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(VMdEditor)
  .use(VMdPreview)
  .use(Vue3Toastify, { autoClose: 1500, limit: 3, transition: Bounce } as ToastContainerOptions)

app.mount('#app')
app.config.globalProperties.$axios = axios
console.log('API HOST: ', import.meta.env.VITE_API_HOST)
