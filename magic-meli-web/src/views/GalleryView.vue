<script setup lang="ts">
import DesktopIconContainer from '@/components/DesktopIconContainer.vue'
import WindowContainer from '@/components/window/WindowContainer.vue'
import IconFolder from '@/components/icons/IconFolder.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getImageList } from '@/requests/image'
const router = useRoute()
const isShowList = computed<Boolean>(() => {
  return router.meta.isListPageCheck === router.name ? true : false
})
console.log(getImageList())
</script>

<template>
  <WindowContainer>
    <div class="flex flex-wrap justify-start gap-7" v-if="isShowList">
      <RouterLink :to="{ name: 'fanart' }">
        <DesktopIconContainer :title="'Fanart'">
          <IconFolder :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
    </div>
    <RouterView></RouterView>
  </WindowContainer>
</template>

<style scoped></style>
