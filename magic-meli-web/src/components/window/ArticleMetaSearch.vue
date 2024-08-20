<script lang="ts" setup>
  import { useArticleStore } from '@/stores/store'
  import IconClose from '../icons/IconClose.vue'
  import IconSearch from '../icons/IconSearch.vue'
  const articleStore = useArticleStore()
</script>

<template>
  <form
    class="flex h-7 w-1/5 min-w-56 items-center gap-x-1 bg-windowFuchsia px-1 text-themeViolet dark:bg-darkWindowFuchsia dark:text-darkViolet"
    @submit.prevent.self
  >
    <IconSearch :width="24" :height="24" class="shrink-0" />
    <input
      v-model.trim="articleStore.metaSearchPrompt"
      class="h-full w-full bg-inherit font-Fusion outline-none"
      type="text"
    />
    <button
      v-show="articleStore.metaSearchPrompt.length > 0"
      type="button"
      class="w-fit rounded-sm hover:bg-themeFuchsia"
      @click="articleStore.metaSearchPrompt = ''"
    >
      <IconClose :width="20" :height="20" />
    </button>
  </form>
</template>

<style scoped></style>
