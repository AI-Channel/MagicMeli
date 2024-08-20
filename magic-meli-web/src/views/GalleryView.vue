<script lang="ts" setup>
  import DesktopIconContainer from '@/components/DesktopIconContainer.vue'
  import IconFolder from '@/components/icons/DesktopIconFolder.vue'
  import WindowContainer from '@/components/window/WindowContainer.vue'
</script>

<template>
  <WindowContainer>
    <div v-if="$route.meta.isListShow" class="flex flex-wrap justify-start gap-7">
      <DesktopIconContainer :title="'Fanart'">
        <IconFolder :width="64" :height="64" />
      </DesktopIconContainer>
    </div>
  </WindowContainer>
</template>

<style scoped></style>
