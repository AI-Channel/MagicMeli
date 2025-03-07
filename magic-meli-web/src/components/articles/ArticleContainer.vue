<script lang="ts" setup>
  import FloatBar from '@/components/articles/FloatBar.vue'
  import { type ArticleViewResponse, emptyArticle } from '@/models/article'
  import type { imgObj } from '@/models/images'
  import { getArticleById } from '@/scripts/requests/article'

  import { sleep } from '@/scripts/libs'
  import VMdPreview from '@kangc/v-md-editor/lib/preview'
  import { onBeforeMount, onMounted, ref, type Ref } from 'vue'
  import VueEasyLightbox from 'vue-easy-lightbox'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const id = Number(route.params.id)
  const visibleRef = ref(false)
  const indexRef = ref<number>()
  let article: Ref<ArticleViewResponse> = ref(emptyArticle)
  let images: Ref<imgObj[]> = ref([{ src: '' }])

  const onShow = (index: number) => {
    visibleRef.value = true
    indexRef.value = index
  }
  const onHide = () => (visibleRef.value = false)

  onBeforeMount(async () => {
    let imageLinks: string[]
    const imageLinkPattern = /(?<=!\[.*\]\()(.+?)(?=\))/g
    article.value = await getArticleById(id)
    imageLinks = article.value.content.match(imageLinkPattern) as string[]
    if (imageLinks) for (let i = 0; i < imageLinks.length; i++) images.value.push({ src: imageLinks[i] })
  })

  onMounted(async () => {
    await sleep(500)
    let imgList = document.getElementsByTagName('img')
    for (let i = 0; i < imgList.length; i++) {
      if (imgList[i].classList.length > 0) continue
      imgList[i].onclick = () => onShow(i)
    }
  })
  const BacktoTop = () => document.getElementsByTagName('article')[0].scroll({ top: 0, behavior: 'smooth' })
</script>

<template>
  <div>
    <section class="article dark:text-darkVioletn m-auto max-w-[700px] font-Fusion leading-8 text-themeViolet">
      <h1 :id="article.title">
        <a class="header-anchor" :href="'#' + article.title">#</a>
        {{ article.title }}
      </h1>
      <p class="flex flex-wrap justify-between gap-x-8">
        <span>{{ '作者: ' + article.author }}</span>
        <span>{{ '修改时间: ' + new Date(article.updateTime).toLocaleString() }}</span>
      </p>
      <hr />
    </section>
    <VMdPreview
      id="article"
      class="article dark:text-darkVioletn m-auto max-w-[700px] font-Fusion leading-8 text-themeViolet"
      :text="article.content"
    ></VMdPreview>
    <FloatBar @backto-top="BacktoTop()" />
    <VueEasyLightbox
      :imgs="[...images]"
      :index="indexRef"
      :loop="true"
      :visible="visibleRef"
      :zoom-scale="0.4"
      @hide="onHide"
    >
    </VueEasyLightbox>
  </div>
</template>

<style scoped>
  :deep(.vel-img:hover) {
    cursor: default;
  }
  :deep(img:hover) {
    cursor: zoom-in;
  }
</style>
