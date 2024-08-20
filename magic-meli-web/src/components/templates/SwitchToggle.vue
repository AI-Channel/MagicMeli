<script lang="ts" setup>
  const props = defineProps<{
    isChecked?: boolean
  }>()
</script>

<template>
  <input
    id="id-c01"
    :checked="props.isChecked"
    class="peer relative h-6 w-12 cursor-pointer appearance-none rounded-xl bg-themeFuchsia transition-colors after:absolute after:left-0 after:top-0 after:h-6 after:w-6 after:rounded-full after:bg-violet-500 after:transition-all checked:bg-fuchsia-200 checked:after:left-6 checked:after:bg-violet-500 hover:bg-fuchsia-200 after:hover:bg-indigo-600 checked:hover:bg-fuchsia-300 checked:after:hover:bg-indigo-600 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
    type="checkbox"
  />
</template>

<style scoped></style>
