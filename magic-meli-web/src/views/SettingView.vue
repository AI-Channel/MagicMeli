<script lang="ts" setup>
  import NightDaySwap from '@/components/templates/NightDaySwap.vue'
  import WindowContainer from '@/components/window/WindowContainer.vue'
  import { switchTheme } from '@/scripts/libs'
</script>

<template>
  <WindowContainer>
    <div class="m-auto flex max-w-[1000px] flex-wrap items-center">
      <NightDaySwap @switch-theme="switchTheme()" />
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
