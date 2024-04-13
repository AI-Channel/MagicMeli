import MarkdownIt from 'markdown-it'
import VMdEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import createHljsTheme from '@kangc/v-md-editor/lib/theme/hljs'
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index'
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align'
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn'

import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/style/preview.css'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import { mark } from '@mdit/plugin-mark'

import hljs from 'highlight.js'

const hljsTheme = createHljsTheme({
  Hljs: hljs
})

hljsTheme.extend((md: MarkdownIt) => {
  md.set({ html: true, breaks: true, linkify: true, typographer: true }).use(mark)
})

VMdEditor.use(githubTheme, { Hljs: hljs })
VMdPreview.vMdParser.theme(hljsTheme)

VMdEditor.use(createTipPlugin())
VMdEditor.use(createAlignPlugin())
VMdEditor.use(createEmojiPlugin())
VMdEditor.use(createLineNumbertPlugin())
VMdEditor.use(createCopyCodePlugin())
VMdEditor.use(createKatexPlugin())

VMdPreview.use(createTipPlugin())
VMdPreview.use(createAlignPlugin())
VMdPreview.use(createLineNumbertPlugin())
VMdPreview.use(createCopyCodePlugin())
VMdPreview.use(createKatexPlugin())

export { VMdEditor, VMdPreview }
