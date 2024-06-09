<script setup lang="ts">
import { testUser } from '@/scripts/userInfo'
import { ref } from 'vue'

const usernameEntered = ref('')
const passwordEntered = ref('')
function submitAndCheck(usernameEntered: string, passwordEntered: string) {
  if (usernameEntered === testUser._username) {
    if (passwordEntered === testUser._password) {
      alert('Login success!✝升天✝')
    } else {
      alert('Password Incorrect!')
    }
  } else {
    alert('Username Incorrect!')
  }
}
</script>

<template>
  <div class="m-auto h-full w-full select-none bg-login bg-cover">
    <div class="relative left-1/4 top-[12.5%] z-10 flex h-4/5 min-h-80 w-1/2 min-w-80 flex-col rounded-lg bg-white bg-opacity-80 p-6">
      <div class="m-auto">
        <img src="/src/assets/graphs/icon_cho.png" class="mx-auto my-5 max-w-fit" alt="avatar" />
        <form class="flex flex-col gap-y-4 font-Dinkie text-themeViolet dark:text-darkViolet">
          <label for="username" class="flex select-none items-center">
            <span class="w-1/3 min-w-fit">Username:</span>
            <input type="text" class="form-input max-h-9 w-2/3 py-1" id="username" v-model="usernameEntered" required />
          </label>
          <label for="password" class="flex select-none items-center">
            <span class="w-1/3 min-w-fit">Password:</span>
            <input type="password" class="form-input max-h-9 w-2/3 py-1" id="password" v-model="passwordEntered" required />
          </label>
          <div class="flex place-content-between">
            <label for="remember" class="select-none items-center">
              Remember Me
              <input type="checkbox" class="form-checkbox text-themeViolet dark:text-darkViolet" id="remember" />
            </label>
            <RouterLink :to="{ name: 'register' }" class="rounded-sm px-2 hover:bg-activeFuchsia dark:hover:bg-indigo-400">
              <span>Sign up</span>
            </RouterLink>
          </div>
          <button class="rounded border border-themeViolet bg-themeFuchsia shadow" @click="submitAndCheck(usernameEntered, passwordEntered)">
            login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
