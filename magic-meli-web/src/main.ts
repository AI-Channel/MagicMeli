import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VMdEditor, VMdPreview } from './scripts/mdRenderer'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VMdEditor)
app.use(VMdPreview)

app.mount('#app')
