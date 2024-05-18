<script setup lang="ts">
import IconImageUpload from '@/components/icons/IconImageUpload.vue'
import type { Image } from '@/models/image'
import { uploadImageBase64 } from '@/requests/image'
import { fileOpen, type FileWithHandle } from 'browser-fs-access'
async function openFile() {
  const blob: FileWithHandle = await fileOpen({
    mimeTypes: ['image/*']
  })
  const reg: RegExp = /data:.*base64,/
  let base64Data: string = ''
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = (event) => {
    base64Data = event.target?.result?.toString().replace(reg, '') ?? ''
    const imgInfo: Image = {
      title: blob.name,
      description: '',
      imageDataBase64: base64Data
    }
    uploadImageBase64(imgInfo)
  }
}
</script>

<template>
  <IconImageUpload :width="24" :height="24" class="cursor-pointer" @click="openFile()" />
</template>

<style scoped></style>
