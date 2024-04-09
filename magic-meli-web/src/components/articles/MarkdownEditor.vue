<script setup lang="ts">
import VMdEditor from '@kangc/v-md-editor'
let markdown = ''
</script>

<template>
  <KeepAlive>
    <VMdEditor v-model="markdown" height="100%"></VMdEditor>
  </KeepAlive>
</template>

<style scoped></style>
