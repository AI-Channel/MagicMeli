<script setup lang="ts">
import DesktopIcon from './components/DesktopIcon.vue'
import IconArticle from './components/icons/IconArticle.vue'
import IconProfile from './components/icons/IconProfile.vue'
import IconInvader from './components/icons/IconInvader.vue'
import IconSetting from './components/icons/IconSetting.vue'
import WindowSimulation from './components/WindowSimulation.vue'
import { useWindowStore } from './stores/showWindow'
const store = useWindowStore()
</script>

<template>
  <div
    class="absolute inset-0 m-auto grid max-h-fit max-w-full grid-flow-row grid-cols-3 grid-rows-9 place-items-center gap-8 place-self-stretch py-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-flow-col lg:grid-cols-9 lg:gap-4 xl:grid-cols-12"
  >
    <DesktopIcon title="个人资料" @click="store.isOpen = true">
      <IconProfile :width="64" :height="64" />
    </DesktopIcon>
    <RouterLink :to="{ name: 'article' }" class="m-auto">
      <DesktopIcon title="文章列表" @click="store.isOpen = true">
        <IconArticle :width="64" :height="64" />
      </DesktopIcon>
    </RouterLink>
    <DesktopIcon title="设置" @click="store.isOpen = true">
      <IconSetting :width="64" :height="64" />
    </DesktopIcon>
    <RouterLink :to="{ name: 'cyberpunk' }" class="m-auto">
      <DesktopIcon title="机托邦" @click="store.isOpen = true">
        <IconInvader :width="64" :height="64" />
      </DesktopIcon>
    </RouterLink>
    <WindowSimulation title="测试标题">
      <RouterView name="root"></RouterView>
      <RouterView></RouterView>
    </WindowSimulation>
  </div>
</template>

<style scoped></style>
