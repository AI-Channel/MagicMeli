import MarkdownIt from 'markdown-it'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'
import anchor from 'markdown-it-anchor'
import { mark } from '@mdit/plugin-mark'
import { footnote } from '@mdit/plugin-footnote'
import { tasklist } from '@mdit/plugin-tasklist'

const markdown = new MarkdownIt({
  linkify: true,
  typographer: true
})
  .use(sub)
  .use(sup)
  .use(mark)
  .use(footnote)
  .use(tasklist)
  .use(anchor, { permalink: anchor.permalink.headerLink() })

function GetRender(source: string) {
  return markdown.render(source)
}
export { GetRender }
