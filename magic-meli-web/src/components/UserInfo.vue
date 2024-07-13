<script lang="ts" setup>
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { getUserInfoByUserId, tokenRefresh } from '@/requests/user'
  import { autoToast } from '@/scripts/libs'
  import { useUserStore } from '@/stores/store'
  import { onBeforeMount, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import IconLogout from './icons/IconLogout.vue'
  const route = useRoute()
  const router = useRouter()
  const userInfo = ref({})
  const userStore = useUserStore()
  const infoMap = new Map([
    ['userId', '用户ID'],
    ['username', '昵称'],
    ['email', 'Email'],
    ['about', '简介'],
    ['level', '等级']
  ])
  onBeforeMount(async () => {
    try {
      userInfo.value = await getUserInfoByUserId(route.params.userId as string)
      localStorage.setItem('token', await tokenRefresh())
    } catch (error) {
      userStore.isLoggedIn = false
      autoToast('登录信息过期，请重新登录', 'error')
      setTimeout(() => router.replace({ name: 'login' }), 1500)
    }
  })
  function Logout() {
    userStore.isLoggedIn = false
    localStorage.setItem('token', '')
    autoToast('登出成功', 'success')
    setTimeout(() => router.push({ name: 'home' }), 1500)
  }
</script>

<template>
  <WindowContainer>
    <ul class="m-auto grid grid-cols-2 p-4 font-Dinkie text-2xl text-themeViolet dark:text-darkViolet">
      <li v-for="(item, key) in userInfo" :key="key">
        <span>{{ infoMap.get(key) }}</span>
        :
        <span>{{ item }}</span>
      </li>
    </ul>
    <button
      class="m-auto flex select-none place-content-center items-center gap-x-3 font-Dinkie text-3xl text-themeViolet dark:text-darkViolet"
      @click="Logout()"
    >
      <IconLogout :width="48" :height="48" />
      Logout
    </button>
  </WindowContainer>
</template>

<style scoped></style>
