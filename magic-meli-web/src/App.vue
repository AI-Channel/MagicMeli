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
  import IconSetting from './components/icons/DesktopIconSetting.vue'
  import { tokenRefresh } from './requests/user'
  import { jwtDecode, setTheme } from './scripts/libs'
  import { useUserStore } from './stores/store'
  import IconSearch from './components/icons/DesktopIconSearch.vue'

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
  <main
    class="absolute inset-0 m-auto grid max-h-fit max-w-full grid-flow-row grid-cols-3 grid-rows-6 place-items-center gap-8 place-self-stretch py-4 sm:grid-cols-5 md:grid-cols-7 md:grid-rows-7 lg:grid-flow-col lg:grid-cols-8 lg:grid-rows-8 lg:gap-4 xl:grid-cols-12 xl:grid-rows-9"
  >
    <RouterLink
      :to="userStore.isLoggedIn ? { name: 'userInfo', params: { userId: userStore.userId } } : { name: 'login' }"
      class="m-auto"
    >
      <DesktopIconContainer title="个人资料">
        <IconProfile :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink :to="{ path: '/articles' }" class="m-auto">
      <DesktopIconContainer title="文章列表">
        <IconArticle :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink v-if="userStore.isLoggedIn" :to="{ name: 'deleted' }" class="m-auto">
      <DesktopIconContainer title="回收站">
        <IconRecycleBin :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink v-if="userStore.isLoggedIn" :to="{ name: 'draft' }" class="m-auto"
      ><DesktopIconContainer title="草稿箱">
        <IconDraft :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterLink v-if="userStore.isLoggedIn" :to="{ name: 'markdown editor', query: { id: 0 } }" class="m-auto">
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
    <RouterLink :to="{ name: 'search' }" class="m-auto">
      <DesktopIconContainer title="搜索">
        <IconSearch :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>

    <RouterView name="window"></RouterView>
    <a
      href="https://beian.miit.gov.cn"
      class="absolute bottom-0 right-2 font-Dinkie text-[16px] text-themeViolet dark:text-white"
      ><footer>浙 ICP 备 16004952 号-5</footer></a
    >
  </main>
</template>

<style scoped></style>
