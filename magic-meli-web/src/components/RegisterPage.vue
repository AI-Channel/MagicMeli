<script setup lang="ts">
import { ref } from 'vue'
const idEntered = ref('')
const usernameEntered = ref('')
const passwordEntered = ref('')
const emailEntered=ref('')
</script>

<template>
  <div class="m-auto h-full w-full select-none bg-login bg-cover">
    <div class="relative left-1/4 top-[12.5%] z-10 flex h-4/5 min-h-112 w-1/2 min-w-80 flex-col rounded-lg bg-white bg-opacity-80 p-6">
      <div class="m-auto">
        <img src="/src/assets/graphs/icon_ame.png" class="mx-auto my-5 max-w-fit" alt="avatar" />
        <form class="flex flex-col gap-y-4 font-Dinkie text-themeViolet dark:text-darkViolet">
          <label for="id" class="flex select-none items-center">
            <span class="w-1/3 min-w-fit">ID:</span>
            <input type="text" class="form-input max-h-9 w-2/3 py-1" id="id" v-model="idEntered" required />
          </label>
          <label for="username" class="flex select-none items-center">
            <span class="w-1/3 min-w-fit">Username:</span>
            <input type="text" class="form-input max-h-9 w-2/3 py-1" id="username" v-model="usernameEntered" required />
          </label>
          <label for="password" class="flex select-none items-center">
            <span class="w-1/3 min-w-fit">Password:</span>
            <input type="password" class="form-input max-h-9 w-2/3" id="password" v-model="passwordEntered" required />
          </label>
          <label for="email" class="flex select-none items-center">
            <span class="w-1/3 min-w-fit">Email:</span>
            <input type="text" class="form-input max-h-9 w-2/3 py-1" id="email" v-model="emailEntered" required />
          </label>
          <div class="flex select-none place-content-between">
            <p>Already have an account? →</p>
            <RouterLink :to="{ name: 'login' }" class="rounded-sm px-2 hover:bg-activeFuchsia dark:hover:bg-indigo-400"><span>Sign in</span></RouterLink>
          </div>
          <button class="rounded border border-themeViolet bg-themeFuchsia shadow">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
