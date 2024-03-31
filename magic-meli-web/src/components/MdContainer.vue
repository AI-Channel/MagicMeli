<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'
import anchor from 'markdown-it-anchor'

const markdown = new MarkdownIt({
  linkify: true,
  typographer: true
})
  .use(sub)
  .use(sup)
  .use(anchor, { permalink: true, permalinkBefore: true, permalinkSymbol: '#' })

const props = defineProps<{
  source: string
}>()
</script>

<template>
  <div
    v-html="markdown.render(props.source)"
    class="m-auto flex max-w-[750px] flex-wrap space-y-6 leading-7"
  ></div>
</template>

<style scoped></style>
