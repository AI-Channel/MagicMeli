<script setup lang="ts">
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import SwitchToggle from '@/components/templates/SwitchToggle.vue'
  import { switchTheme, getTheme } from '@/scripts/libs'
</script>

<template>
  <WindowContainer>
    <div class="relative flex flex-wrap items-center">
      <SwitchToggle id="isDark" :is-checked="getTheme() === 'dark' ? true : false" @click="switchTheme" />
      <label
        class="cursor-pointer select-none pl-2 font-Dinkie text-themeViolet peer-disabled:cursor-not-allowed peer-disabled:text-violet-400"
        for="isDark"
      >
        夜间模式
      </label>
    </div>
  </WindowContainer>
</template>

<style scoped></style>
