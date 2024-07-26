<script lang="ts" setup>
  import type { UserLoginDto } from '@/models/user'
  import { login } from '@/requests/user'
  import { autoToast, jwtDecode } from '@/scripts/libs'
  import { useUserStore } from '@/stores/store'
  import { ref, type Ref } from 'vue'
  import { useRouter } from 'vue-router'

  const userLogin: Ref<UserLoginDto> = ref({ userId: '', password: '' })
  const userStore = useUserStore()
  const router = useRouter()

  async function handleLogin(user: UserLoginDto) {
    try {
      const token = await login(user)
      localStorage.setItem('token', token)
      // console.log(localStorage.getItem('token'))
      const tokenInfo = jwtDecode(token)
      userStore.isLoggedIn = true
      if (tokenInfo) userStore.userId = tokenInfo.payload.userId
      autoToast('登录成功', 'success')
      setTimeout(() => router.replace({ name: 'userInfo', params: { userId: userStore.userId } }), 1500)
      return token
    } catch (error) {
      autoToast('登录失败，请检查用户名或密码是否正确！', 'error')
    }
  }
</script>

<template>
  <div class="m-auto h-full w-full select-none bg-login bg-cover">
    <div
      class="relative left-[10%] top-[10%] flex h-4/5 min-h-80 w-4/5 min-w-60 flex-col rounded-lg bg-white bg-opacity-80 p-6 lg:left-1/4 lg:w-1/2"
    >
      <div class="m-auto">
        <img alt="avatar" class="mx-auto my-5 max-w-fit" src="/src/assets/graphs/icon_cho.png" />
        <form class="flex flex-col gap-y-4 font-Dinkie text-themeViolet dark:text-darkViolet" @submit.prevent>
          <label class="flex select-none items-center" for="username">
            <span class="w-1/3 min-w-fit">UserID:</span>
            <input
              id="username"
              v-model="userLogin.userId"
              class="form-input max-h-9 w-2/3 py-1"
              required
              type="text"
            />
          </label>
          <label class="flex select-none items-center" for="password">
            <span class="w-1/3 min-w-fit">Password:</span>
            <input
              id="password"
              v-model="userLogin.password"
              class="form-input max-h-9 w-2/3 py-1"
              required
              type="password"
              @keyup.enter="handleLogin(userLogin)"
            />
          </label>
          <div class="flex place-content-between">
            <label class="select-none items-center" for="remember">
              Remember Me
              <input id="remember" class="form-checkbox" type="checkbox" />
            </label>
          </div>
          <button
            class="rounded border border-themeViolet bg-themeFuchsia shadow"
            type="button"
            @click="handleLogin(userLogin)"
          >
            login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
