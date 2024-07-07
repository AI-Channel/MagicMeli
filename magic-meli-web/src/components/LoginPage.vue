<script lang="ts" setup>
  import type { UserLoginDto } from '@/models/user'
  import { login } from '@/requests/user'
  import { autoToast } from '@/scripts/libs'
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
      userStore.isLoggedIn = true
      autoToast('登录成功', 'success')
      // console.log(localStorage.getItem('token'))
      setTimeout(() => router.push({ name: 'home' }), 1500)
      return token
    } catch (error) {
      autoToast('登录失败，请检查用户名或密码是否正确！', 'error')
    }
  }
</script>

<template>
  <div class="m-auto h-full w-full select-none bg-login bg-cover">
    <div
      class="relative left-1/4 top-[12.5%] z-10 flex h-4/5 min-h-80 w-1/2 min-w-80 flex-col rounded-lg bg-white bg-opacity-80 p-6"
    >
      <div class="m-auto">
        <img alt="avatar" class="mx-auto my-5 max-w-fit" src="/src/assets/graphs/icon_cho.png" />
        <form class="flex flex-col gap-y-4 font-Dinkie text-themeViolet dark:text-darkViolet">
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
            />
          </label>
          <div class="flex place-content-between">
            <label class="select-none items-center" for="remember">
              Remember Me
              <input id="remember" class="form-checkbox text-themeViolet dark:text-darkViolet" type="checkbox" />
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
