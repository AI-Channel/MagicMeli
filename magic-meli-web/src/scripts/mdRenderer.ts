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
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn'
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'

import '@kangc/v-md-editor/lib/theme/style/github.css'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/style/preview.css'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import '@/assets/styles/meliMarkdownStyle.css'
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'
import { mark } from '@mdit/plugin-mark'
import anchor from 'markdown-it-anchor'

import hljs from 'highlight.js'

const hljsTheme = createHljsTheme({
  Hljs: hljs
})

hljsTheme.extend((md: MarkdownIt) => {
  md.set({
    html: false,
    breaks: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const preCode = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          return '<pre class="hljs"><code>' + preCode + '</code></pre>'
        } catch (__) {
          /* empty */
        }
      }
      const preCode = md.utils.escapeHtml(str)
      return '<pre class="hljs"><code>' + preCode + '</code></pre>'
    }
  })
    .use(mark)
    .use(anchor, { permalink: anchor.permalink.linkInsideHeader({ placement: 'before' }) })
})

VMdEditor.use(githubTheme, {
  Hljs: hljs,
  extend(md: MarkdownIt) {
    md.set({
      html: false,
      breaks: true,
      linkify: true,
      typographer: true
    })

      .use(mark)
      .use(anchor, { permalink: anchor.permalink.linkInsideHeader({ placement: 'before' }) })
  }
})

VMdPreview.vMdParser.theme(hljsTheme)

VMdEditor.use(createTipPlugin())
  .use(createAlignPlugin())
  .use(createEmojiPlugin())
  .use(createLineNumbertPlugin())
  .use(createCopyCodePlugin())
  .use(createKatexPlugin())
  .use(createMermaidPlugin())
  .use(createTodoListPlugin())

VMdPreview.use(createTipPlugin())
  .use(createAlignPlugin())
  .use(createLineNumbertPlugin())
  .use(createEmojiPlugin())
  .use(createCopyCodePlugin())
  .use(createKatexPlugin())
  .use(createMermaidPlugin())
  .use(createTodoListPlugin())

const markdown = new MarkdownIt()
  .set({ html: true, breaks: true, linkify: true, typographer: true })
  .use(mark)
  .use(anchor, { permalink: anchor.permalink.linkInsideHeader({ placement: 'before' }) })

function getRender(source: string | undefined) {
  if (typeof source === 'string') return markdown.render(source)
}

function renderInline(source: string | undefined) {
  if (typeof source === 'string') return markdown.renderInline(source)
}

export { VMdEditor, VMdPreview, getRender, renderInline }
