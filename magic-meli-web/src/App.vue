<script setup lang="ts">
import { onMounted } from 'vue'
import DesktopIconContainer from './components/DesktopIconContainer.vue'
import IconArticle from './components/icons/IconArticle.vue'
import IconFolderOpen from './components/icons/IconFolderOpen.vue'
import IconNewArticle from './components/icons/IconNewArticle.vue'
import IconProfile from './components/icons/IconProfile.vue'
import IconRecycleBin from './components/icons/IconRecycleBin.vue'
import IconSetting from './components/icons/IconSetting.vue'
import { setTheme } from './scripts/libs'
import { RouterLink } from 'vue-router'
import IconDraft from './components/icons/IconDraft.vue'
import { useUserStore } from './stores/store'
import { tokenVerify } from './requests/user'
const userStore = useUserStore()
onMounted(async () => {
  userStore.setToken(localStorage.getItem('token') ?? false)
  userStore.isVerified = 'id' in await tokenVerify()
  const storedTheme = localStorage.getItem('theme') ?? 'light'
  setTheme(storedTheme)
})
</script>

<template>
  <main
    class="absolute inset-0 m-auto grid max-h-fit max-w-full grid-flow-row grid-cols-3 grid-rows-9 place-items-center gap-8 place-self-stretch py-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-flow-col lg:grid-cols-9 lg:gap-4 xl:grid-cols-12"
  >
    <RouterLink :to="{ name: 'login' }" class="m-auto">
      <DesktopIconContainer title="个人资料">
        <IconProfile :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ name: 'articles' }" class="m-auto">
      <DesktopIconContainer title="文章列表">
        <IconArticle :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ name: 'deleted' }" class="m-auto">
      <DesktopIconContainer title="回收站">
        <IconRecycleBin :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ name: 'draft' }" class="m-auto"
      ><DesktopIconContainer title="草稿箱">
        <IconDraft :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ name: 'markdown editor', query: { id: 0 } }" class="m-auto">
      <DesktopIconContainer title="新文章">
        <IconNewArticle :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ name: 'setting' }" class="m-auto">
      <DesktopIconContainer title="设置">
        <IconSetting :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ name: 'gallery' }" class="m-auto">
      <DesktopIconContainer title="相册">
        <IconFolderOpen :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>

    <RouterView></RouterView>
  </main>
</template>

<style scoped></style>
