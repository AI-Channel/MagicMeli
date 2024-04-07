<script setup lang="ts">
import { ref } from 'vue'
import IconFliter from './icons/IconFliter.vue'
import { useTagStore } from '@/stores/store'
let isFliterShow = ref<boolean>(false)
const store = useTagStore()
</script>

<template>
  <div>
    <IconFliter :width="24" :height="24" @click="isFliterShow = !isFliterShow" />
    <form
      class="absolute right-1 flex flex-col border border-themeViolet bg-themeFuchsia p-2 dark:bg-darkWindowFuchsia"
      v-show="isFliterShow"
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
