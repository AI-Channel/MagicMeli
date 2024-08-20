<script lang="ts" setup>
  import { getTheme } from '@/scripts/libs'
  import IconSun from '../icons/IconSun.vue'
  import IconMoon from '../icons/IconMoon.vue'
  defineEmits(['switchTheme'])
</script>

<template>
  <label class="swap swap-rotate">
    <input id="isDark" type="checkbox" :checked="getTheme() === 'dark' ? true : false" @click="$emit('switchTheme')" />
    <IconSun class="swap-on" :width="24" :height="24"></IconSun>
    <IconMoon class="swap-off" :width="24" :height="24"></IconMoon>
  </label>
</template>

<style scoped></style>
