<script setup lang="ts">
  import DesktopIconContainer from '@/components/DesktopIconContainer.vue'
  import IconFolder from '@/components/icons/IconFolder.vue'
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  const router = useRoute()
  const isShowList = computed<boolean>(() => {
    return router.meta.isListPageCheck === router.name
  })
</script>

<template>
  <WindowContainer>
    <div v-if="isShowList" class="flex flex-wrap justify-start gap-7">
      <RouterLink :to="{ name: 'fanart' }">
        <DesktopIconContainer :title="'Fanart'">
          <IconFolder :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
    </div>
  </WindowContainer>
</template>

<style scoped></style>
