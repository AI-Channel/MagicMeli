<script lang="ts" setup>
  import { bgList } from '@/scripts/searchBackground'
  import { computed } from 'vue'
  import IconSearch from './icons/IconSearch.vue'
  import IconClose from './icons/IconClose.vue'
  import { randomSelect } from '@/scripts/libs'

  const bgSelected = computed(() => randomSelect(bgList))
  const searchContent = defineModel<string>({ default: '' })
</script>

<template>
  <div :style="{ backgroundImage: `url('${bgSelected}')` }" class="m-auto flex h-full w-full bg-cover">
    <form
      class="m-auto flex w-[300px] items-center gap-x-2 rounded bg-windowFuchsia bg-opacity-70 px-2 py-1 font-Fusion text-themeViolet shadow-black drop-shadow-lg md:w-[400px] lg:w-[500px] xl:w-[600px] dark:text-darkViolet"
    >
      <IconSearch :width="48" :height="48" class="shrink-0" />
      <input v-model.trim="searchContent" class="w-full bg-transparent text-[26px] outline-none" />
      <button v-show="searchContent.length > 0" type="button" class="h-fit" @click="searchContent = ''">
        <IconClose :width="24" :height="24" />
      </button>
    </form>
  </div>
</template>

<style scoped></style>
