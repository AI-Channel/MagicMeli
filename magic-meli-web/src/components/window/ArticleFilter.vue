<script setup lang="ts">
  import IconFilter from '@/components/icons/IconFilter.vue'
  import { useArticleStore } from '@/stores/store'
  import { ref } from 'vue'
  let isFilterShow = ref<boolean>(false)
  const store = useArticleStore()
</script>

<template>
  <div>
    <IconFilter :width="24" :height="24" class="cursor-pointer" @click="isFilterShow = !isFilterShow" />
    <form
      v-show="isFilterShow"
      ref="dropdownMenu"
      class="absolute right-1 flex max-h-64 flex-col overflow-y-auto border border-themeViolet bg-themeFuchsia p-2 dark:bg-darkWindowFuchsia"
    >
      <label
        v-for="item in store.articleTags"
        :key="item"
        class="label flex cursor-pointer appearance-none place-content-between items-center gap-x-3 text-themeViolet dark:text-darkViolet"
      >
        <span class="label-text" :for="item">{{ item }}</span>
        <input
          v-model="store.checkedTags"
          type="checkbox"
          class="checkbox text-themeViolet focus:ring-themeViolet dark:text-darkViolet dark:focus:ring-darkViolet"
          :value="item"
        />
      </label>
    </form>
  </div>
</template>

<style scoped></style>
