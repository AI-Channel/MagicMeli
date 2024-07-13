<script lang="ts" setup>
  import DesktopIconContainer from '@/components/DesktopIconContainer.vue'
  import IconFolder from '@/components/icons/IconFolder.vue'
  import WindowContainer from '@/components/window/WindowContainer.vue'
</script>

<template>
  <WindowContainer>
    <div v-if="$route.meta.isListShow" class="flex flex-wrap justify-start gap-7">
      <RouterLink :to="{ name: 'fanart' }">
        <DesktopIconContainer :title="'Fanart'">
          <IconFolder :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
    </div>
  </WindowContainer>
</template>

<style scoped></style>
