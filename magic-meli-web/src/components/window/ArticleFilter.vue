<script setup lang="ts">
import { ref } from 'vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import { useArticleStore } from '@/stores/store'
let isFilterShow = ref<boolean>(false)
const store = useArticleStore()
</script>

<template>
  <div>
    <IconFilter
      :width="24"
      :height="24"
      @click="isFilterShow = !isFilterShow"
      class="cursor-pointer"
    />
    <form
      class="absolute right-1 flex max-h-64 flex-col overflow-y-auto border border-themeViolet bg-themeFuchsia p-2 dark:bg-darkWindowFuchsia"
      v-show="isFilterShow"
      ref="dropdownMenu"
    >
      <label
        v-for="item in store.articleTags"
        :key="item"
        class="label flex cursor-pointer place-content-between items-center text-themeViolet dark:text-darkViolet"
      >
        <span class="label-text" :for="item">{{ item }}</span>
        <input type="checkbox" class="checkbox" v-model="store.checkedTags" :value="item" />
      </label>
    </form>
  </div>
</template>

<style scoped></style>
