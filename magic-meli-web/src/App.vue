<script setup lang="ts">
import DesktopIconContainer from './components/DesktopIconContainer.vue'
import IconArticle from './components/icons/IconArticle.vue'
import IconProfile from './components/icons/IconProfile.vue'
import IconInvader from './components/icons/IconInvader.vue'
import IconSetting from './components/icons/IconSetting.vue'
import { onMounted } from 'vue'
import { setTheme } from './scripts/libs'
import IconFolderOpen from './components/icons/IconFolderOpen.vue'
import IconNewArticle from './components/icons/IconNewArticle.vue'
import { useArticleStore } from './stores/store'
import IconRecycleBin from './components/icons/IconRecycleBin.vue'
onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  if (typeof storedTheme == 'string') setTheme(storedTheme)
})
const store = useArticleStore()
</script>

<template>
  <main
    class="absolute inset-0 m-auto grid max-h-fit max-w-full grid-flow-row grid-cols-3 grid-rows-9 place-items-center gap-8 place-self-stretch py-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-flow-col lg:grid-cols-9 lg:gap-4 xl:grid-cols-12"
  >
    <DesktopIconContainer title="个人资料">
      <IconProfile :width="64" :height="64" />
    </DesktopIconContainer>
    <RouterLink :to="{ name: 'article' }" class="m-auto">
      <DesktopIconContainer title="文章列表">
        <IconArticle :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ name: 'recycle' }" class="m-auto">
      <DesktopIconContainer title="回收站">
        <IconRecycleBin :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ name: 'markdown editor' }" class="m-auto">
      <DesktopIconContainer title="新文章" @click="store.atricleContent = ''">
        <IconNewArticle :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ name: 'setting' }" class="m-auto">
      <DesktopIconContainer title="设置">
        <IconSetting :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <DesktopIconContainer title="机托邦">
      <IconInvader :width="64" :height="64" />
    </DesktopIconContainer>
    <RouterLink :to="{ name: 'gallery' }" class="m-auto">
      <DesktopIconContainer title="相册">
        <IconFolderOpen :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterView></RouterView>
  </main>
</template>

<style scoped></style>
