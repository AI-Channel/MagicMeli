<script lang="ts" setup>
  const props = defineProps<{
    width?: number | string
    height?: number | string
  }>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="fill-themeViolet dark:fill-darkViolet"
    :width="props.width"
    :height="props.height"
    viewBox="0 0 24 24"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13 0H11V4H13V0ZM24 13V11H20V13H24ZM11 20H13V24H11V20ZM0 11V13H4V11H0ZM2 2H4V4H2V2ZM4 4H6V6H4V4ZM18 4H20V6H18V4ZM20 4V2H22V4H20ZM18 18H20V20H18V18ZM20 20H22V22H20V20ZM4 18H6V20H4V18ZM4 20V22H2V20H4ZM8 6H16V8H8V6ZM16 16V8H18V16H16ZM8 16H16V18H8V16ZM8 8H6V16H8V8Z"
    />
  </svg>
</template>

<style scoped></style>
