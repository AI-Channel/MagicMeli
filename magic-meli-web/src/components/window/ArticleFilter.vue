<script lang="ts" setup>
  import IconFilter from '@/components/icons/IconFilter.vue'
  import { useArticleStore } from '@/stores/store'
  import { ref } from 'vue'

  let isFilterShow = ref<boolean>(false)
  const store = useArticleStore()
</script>

<template>
  <div class="flex">
    <button>
      <IconFilter :height="24" :width="24" class="cursor-pointer" @click="isFilterShow = !isFilterShow" />
      <span class="sr-only">标签过滤</span>
    </button>
    <form
      v-show="isFilterShow"
      ref="dropdownMenu"
      class="absolute right-1 top-20 flex max-h-64 flex-col overflow-y-auto border-2 border-themeViolet bg-themeFuchsia p-2 dark:border-darkViolet dark:bg-darkWindowFuchsia"
    >
      <label
        v-for="item in store.articleTags"
        :key="item"
        class="label flex cursor-pointer appearance-none place-content-between items-center gap-x-3 text-themeViolet dark:text-darkViolet"
      >
        <span :for="item" class="label-text">{{ item }}</span>
        <input
          v-model="store.checkedTags"
          :value="item"
          class="checkbox text-themeViolet focus:ring-themeViolet dark:text-darkViolet dark:focus:ring-darkViolet"
          type="checkbox"
        />
      </label>
    </form>
  </div>
</template>

<style scoped></style>
