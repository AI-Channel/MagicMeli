<script lang="ts" setup>
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { getUserInfoByUserId, tokenRefresh, updateUserInfoByUserId } from '@/requests/user'
  import { autoToast } from '@/scripts/libs'
  import { useUserStore } from '@/stores/store'
  import { onBeforeMount, ref, type Ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import IconLogout from './icons/IconLogout.vue'
  import IconEdit from './icons/IconEdit.vue'
  import IconCheck from './icons/IconCheck.vue'
  import { usersLevelStr, type UserPublicInfoDto } from '@/models/user'
  import IconClose from './icons/IconClose.vue'
  const route = useRoute()
  const router = useRouter()
  const userInfo: Ref<UserPublicInfoDto> = ref({
    userId: '',
    username: '',
    email: '',
    about: '',
    level: usersLevelStr.guest
  })
  const userStore = useUserStore()
  const editMode = ref(false)
  let userIdCache: string

  onBeforeMount(async () => {
    try {
      userInfo.value = await getUserInfoByUserId(route.params.userId as string)
      localStorage.setItem('token', await tokenRefresh())
      userIdCache = userInfo.value.userId
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

  async function handleUpdate() {
    editMode.value = false
    const userInfoEcho = await updateUserInfoByUserId(userIdCache, userInfo.value)
    return userInfoEcho
  }
</script>

<template>
  <WindowContainer>
    <div class="p-3 font-Dinkie text-themeViolet dark:text-darkViolet">
      <section class="flex select-none gap-x-4">
        <h1>用户信息</h1>
        <Transition name="fade" mode="out-in">
          <button v-if="!editMode" @click="editMode = true">
            <IconEdit :width="24" :height="24" />
          </button>
          <div v-else class="flex gap-x-4">
            <button
              @click="
                async () => {
                  ;(editMode = false), (userInfo = await getUserInfoByUserId(route.params.userId as string))
                }
              "
            >
              <IconClose :width="24" :height="24" />
            </button>
            <button @click="handleUpdate()">
              <IconCheck :width="24" :height="24" />
            </button>
          </div>
        </Transition>
        <span class="sr-only">编辑</span>
      </section>
      <hr />
      <ul class="m-auto grid grid-cols-2 grid-rows-4 gap-x-10 gap-y-2 text-2xl">
        <li class="w-full">
          <label class="flex space-x-3">
            <span class="select-none text-nowrap">用户ID:</span>
            <input
              v-if="editMode"
              v-model="userInfo.userId"
              class="box-border w-3/4 border border-themeViolet px-3 outline-themeViolet dark:border-darkViolet dark:outline-darkViolet"
            />
            <span v-else class="">{{ userInfo.userId }}</span>
          </label>
        </li>
        <li class="row-span-4 h-full w-full">
          <label class="flex h-full space-x-3">
            <span class="select-none text-nowrap">简介:</span>
            <textarea
              v-if="editMode"
              v-model="userInfo.about"
              class="box-border h-full w-3/4 whitespace-pre-wrap break-words border border-themeViolet px-3 outline-themeViolet dark:border-darkViolet dark:outline-darkViolet"
            ></textarea>
            <pre v-else class="font-Dinkie">{{ userInfo.about }}</pre>
          </label>
        </li>
        <li class="w-full">
          <label class="flex space-x-3">
            <span class="select-none text-nowrap">用户名:</span>
            <input
              v-if="editMode"
              v-model="userInfo.username"
              class="box-border w-3/4 border border-themeViolet px-3 outline-themeViolet dark:border-darkViolet dark:outline-darkViolet"
            />
            <span v-else class="">{{ userInfo.username }}</span>
          </label>
        </li>
        <li class="w-full">
          <label class="flex space-x-3">
            <span class="select-none text-nowrap">邮箱:</span>
            <input
              v-if="editMode"
              v-model="userInfo.email"
              class="box-border w-3/4 border border-themeViolet px-3 outline-themeViolet dark:border-darkViolet dark:outline-darkViolet"
            />
            <span v-else class="">{{ userInfo.email }}</span>
          </label>
        </li>
        <li class="w-full">
          <label class="flex space-x-3">
            <span class="select-none text-nowrap">用户等级:</span>
            <span class="">{{ userInfo.level }}</span>
          </label>
        </li>
      </ul>
      <button
        class="mx-auto my-8 flex select-none place-content-center items-center gap-x-3 text-3xl"
        @click="Logout()"
      >
        <IconLogout :width="48" :height="48" />
        Logout
      </button>
    </div>
  </WindowContainer>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
