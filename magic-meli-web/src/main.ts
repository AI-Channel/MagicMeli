import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VMdEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

import hljs from 'highlight.js'

const app = createApp(App)

VMdEditor.use(githubTheme, { Hljs: hljs })
VMdPreview.use(githubTheme, { Hljs: hljs })
app.use(createPinia())
app.use(router)
app.use(VMdEditor)

app.mount('#app')
