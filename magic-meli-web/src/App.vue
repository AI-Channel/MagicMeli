<script setup lang="ts">
import DesktopIconContainer from './components/DesktopIconContainer.vue'
import IconArticle from './components/icons/IconArticle.vue'
import IconProfile from './components/icons/IconProfile.vue'
import IconInvader from './components/icons/IconInvader.vue'
import IconSetting from './components/icons/IconSetting.vue'
import IconPicture from './components/icons/IconPicture.vue'
</script>

<template>
  <div
    class="absolute inset-0 m-auto grid max-h-fit max-w-full grid-flow-row grid-cols-3 grid-rows-9 place-items-center gap-8 place-self-stretch py-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-flow-col lg:grid-cols-9 lg:gap-4 xl:grid-cols-12"
  >
    <DesktopIconContainer title="个人资料">
      <IconProfile :width="64" :height="64" />
    </DesktopIconContainer>
    <RouterLink :to="{ name: 'article' }" class="m-auto">
      <DesktopIconContainer title="文章列表">
        <IconArticle :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <DesktopIconContainer title="设置">
      <IconSetting :width="64" :height="64" />
    </DesktopIconContainer>
    <DesktopIconContainer title="机托邦">
      <IconInvader :width="64" :height="64" />
    </DesktopIconContainer>
    <RouterLink :to="{ name: 'gallery' }" class="m-auto">
      <DesktopIconContainer title="相册">
        <IconPicture :width="64" :height="64" />
      </DesktopIconContainer>
    </RouterLink>
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
