<script setup lang="ts">
import WindowContainer from '@/components/WindowContainer.vue'
import SwitchToggle from '@/components/templates/SwitchToggle.vue'
import { SwitchTheme, GetTheme } from '@/scripts/libs'
</script>

<template>
  <WindowContainer>
    <div>
      <div class="relative flex flex-wrap items-center">
        <SwitchToggle
          :is-checked="GetTheme() === 'dark' ? true : false"
          @click="SwitchTheme"
          id="isDark"
        />
        <label
          class="cursor-pointer select-none pl-2 font-Dinkie text-themeViolet peer-disabled:cursor-not-allowed peer-disabled:text-violet-400"
          for="isDark"
        >
          夜间模式
        </label>
      </div>
    </div>
  </WindowContainer>
</template>

<style scoped></style>
