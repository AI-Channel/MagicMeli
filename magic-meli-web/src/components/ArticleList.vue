<script setup lang="ts">
interface ArticleItem {
  name: string
  title: string
  brief?: string
}
let ArticleList: ArticleItem[] = [
  {
    name: 'never fade away',
    title: 'Never Fade Away',
    brief: "Jonny Silverhand's adventure"
  },
  {
    name: 'being popular',
    title: 'Being Popular',
    brief:
      '作者 Paul Graham 不但是硅谷的【技术大牛】，还是硅谷的【创业教父】。对许多问题（软件开发、企业管理、创业、艺术...），他都有独到见解。他的代表作是《黑客与画家》（俺的网盘上有电子版）。本文就出自此书，洋文标题是：《Being Popular》。文中描绘了作者心目中理想的编程语言，供大伙儿参考。虽然这篇是2001年发表，距今超过10年。但是，好的文章是不会随时间流逝而贬值滴。'
  },
  {
    name: 'icon',
    title: 'Icon Test',
    brief: 'Test of icons'
  }
]
function GetArticleList() {
  return ArticleList
}
</script>

<template>
  <div>
    <RouterLink
      v-for="(item, key) in GetArticleList()"
      class="hover:text-fuchsia-500"
      :key="key"
      :to="{ name: item.name }"
    >
      <h1>{{ item.title }}</h1>
      <div class="line-clamp-2 max-w-screen-xl">{{ item.brief }}</div>
      <hr />
    </RouterLink>
  </div>
</template>

<style scoped></style>
