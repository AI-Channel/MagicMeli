import MarkdownIt from 'markdown-it'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'
import anchor from 'markdown-it-anchor'
import { mark } from '@mdit/plugin-mark'
import footnote from 'markdown-it-footnote'
import { tasklist } from '@mdit/plugin-tasklist'
import container from 'markdown-it-container'
import { align } from '@mdit/plugin-align'
import multimd_table_plugin from 'markdown-it-multimd-table'

const markdown = new MarkdownIt({
  breaks: true,
  linkify: true,
  typographer: true
})
  .use(sub)
  .use(sup)
  .use(mark)
  .use(footnote)
  .use(tasklist)
  .use(container, 'spoiler', {
    validate: function (params: string) {
      return params.trim().match(/^spoiler\s+(.*)$/)
    },

    render: function (
      tokens: {
        [x: string]: {
          info: any
          nesting: number
        }
      },
      idx: string | number
    ) {
      const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        return '<details><summary>' + markdown.utils.escapeHtml(m[1]) + '</summary>\n'
      } else {
        return '</details>\n'
      }
    }
  })
  .use(align)
  .use(multimd_table_plugin, {
    multiline: false,
    rowspan: false,
    headerless: false,
    multibody: true,
    aotolabel: true
  })
  .use(anchor, { permalink: anchor.permalink.headerLink() })

function GetRender(source: string) {
  return markdown.render(source)
}
export { GetRender }
