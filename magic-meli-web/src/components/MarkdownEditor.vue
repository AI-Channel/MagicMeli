<script setup lang="ts">
import { useArticleStore } from '@/stores/store'
import VMdEditor from '@kangc/v-md-editor'
import WindowContainer from './window/WindowContainer.vue'
const store = useArticleStore()
const leftToolbar =
  'undo redo clear|h bold italic strikethrough quote|ul ol table hr|link image code|tip emoji save'
</script>

<template>
  <WindowContainer>
    <VMdEditor v-model="store.atricleContent" :left-toolbar="leftToolbar" height="100%"></VMdEditor>
  </WindowContainer>
</template>

<style scoped></style>
