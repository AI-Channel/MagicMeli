<script lang="ts" setup>
  import { onBeforeMount, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import DesktopIconContainer from './components/DesktopIconContainer.vue'
  import IconArticle from './components/icons/DesktopIconArticle.vue'
  import IconDraft from './components/icons/DesktopIconDraft.vue'
  import IconFolderOpen from './components/icons/DesktopIconFolderOpen.vue'
  import IconNewArticle from './components/icons/DesktopIconNewArticle.vue'
  import IconProfile from './components/icons/DesktopIconProfile.vue'
  import IconRecycleBin from './components/icons/DesktopIconRecycleBin.vue'
  import IconSearch from './components/icons/DesktopIconSearch.vue'
  import IconSetting from './components/icons/DesktopIconSetting.vue'
  import { tokenRefresh } from './scripts/requests/user'
  import { jwtDecode, setTheme } from './scripts/libs'
  import { useUserStore } from './stores/store'
  import TaskBar from './components/TaskBar.vue'

  const userStore = useUserStore()
  async function getNewToken() {
    const newToken = await tokenRefresh()
    localStorage.setItem('token', newToken)
    const tokenInfo = jwtDecode(newToken)
    if (tokenInfo) userStore.userId = tokenInfo.payload.userId
    else userStore.isLoggedIn = false
    userStore.isLoggedIn = true
  }
  onBeforeMount(async () => {
    const storedTheme = localStorage.getItem('theme') ?? 'light'
    setTheme(storedTheme)
    try {
      await getNewToken()
    } catch (error) {
      userStore.isLoggedIn = false
      userStore.userId = ''
    }
  })
  onMounted(() => {
    if (userStore.isLoggedIn == true) {
      setInterval(async () => {
        try {
          await getNewToken()
        } catch (error) {
          userStore.isLoggedIn = false
          userStore.userId = ''
        }
      }, 600000)
    }
  })
</script>

<template>
  <main class="m-0 grid h-full p-0 lg:grid-rows-[calc(100%-2.5rem)_2.5rem]">
    <div class="desktop flex flex-wrap content-baseline gap-3 p-4 lg:flex-col">
      <RouterLink
        :to="userStore.isLoggedIn ? { name: 'userInfo', params: { userId: userStore.userId } } : { name: 'login' }"
      >
        <DesktopIconContainer title="个人资料">
          <IconProfile :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
      <RouterLink :to="{ name: 'articles' }">
        <DesktopIconContainer title="文章列表">
          <IconArticle :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
      <RouterLink v-if="userStore.isLoggedIn" :to="{ name: 'deleted' }">
        <DesktopIconContainer title="回收站">
          <IconRecycleBin :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
      <RouterLink v-if="userStore.isLoggedIn" :to="{ name: 'draft' }">
        <DesktopIconContainer title="草稿箱">
          <IconDraft :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
      <RouterLink v-if="userStore.isLoggedIn" :to="{ name: 'markdown editor', query: { id: 0 } }">
        <DesktopIconContainer title="新文章">
          <IconNewArticle :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
      <RouterLink :to="{ name: 'setting' }">
        <DesktopIconContainer title="设置">
          <IconSetting :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
      <RouterLink :to="{ name: 'gallery' }">
        <DesktopIconContainer title="相册">
          <IconFolderOpen :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
      <RouterLink :to="{ name: 'search' }">
        <DesktopIconContainer title="搜索">
          <IconSearch :width="64" :height="64" />
        </DesktopIconContainer>
      </RouterLink>
      <RouterView :key="$route.fullPath" name="window"></RouterView>
    </div>
    <a
      href="https://beian.miit.gov.cn"
      class="absolute bottom-0 right-2 select-none font-Dinkie text-[16px] text-themeViolet lg:bottom-10 dark:text-white"
    >
      <p>浙 ICP 备 16004952 号-5</p>
    </a>
    <TaskBar class="z-50 hidden lg:flex" />
  </main>
</template>

<style scoped></style>
