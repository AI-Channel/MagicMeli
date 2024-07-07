<script lang="ts" setup>
  import { type ArticleListViewResponse, articleStatusHandles, listQueryMode } from '@/models/article'
  import {
    getAllTagsByArticleList,
    getArticleListByStatus,
    hardDelArticleById,
    updateArticleStatusById
  } from '@/requests/article'
  import { autoToast } from '@/scripts/libs'
  import { useArticleStore } from '@/stores/store'
  import { onBeforeMount, onUpdated, ref, type Ref } from 'vue'
  import StatusBar from './StatusBar.vue'
  import TagsNav from './TagsNav.vue'

  let articleList: Ref<ArticleListViewResponse[]> = ref([])
  const store = useArticleStore()

  const props = defineProps<{
    showMode: listQueryMode
  }>()

  store.status = props.showMode ?? listQueryMode.published

  onBeforeMount(async () => {
    articleList.value = await getArticleListByStatus(props.showMode)
  })

  onUpdated(async () => {
    store.articleTags = await getAllTagsByArticleList(articleList.value)
  })

  async function deleteArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.delete)
      if (props.showMode == 'published') articleList.value = await getArticleListByStatus(listQueryMode.published)
      else if (props.showMode == 'draft') articleList.value = await getArticleListByStatus(listQueryMode.draft)
      autoToast('删除成功', 'success')
    } catch (error) {
      console.error('Unable to delete!')
    }
  }

  async function revertArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.revert)
      articleList.value = await getArticleListByStatus(listQueryMode.deleted)
      autoToast('恢复成功', 'success')
    } catch (error) {
      console.error('Unable to revert!')
    }
  }

  async function publishArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.publish)
      articleList.value = await getArticleListByStatus(listQueryMode.draft)
      autoToast('发布成功', 'success')
    } catch (error) {
      console.error('Unable to publish!')
    }
  }

  async function hardDeleteArticleById(id: number) {
    try {
      if (confirm('确定要永久删除此文章吗？')) {
        await hardDelArticleById(id)
      }
      articleList.value = await getArticleListByStatus(listQueryMode.deleted)
    } catch (error) {
      console.error('Unable to hard delete!')
    }
  }

  async function unpublishArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.unpublish)
      articleList.value = await getArticleListByStatus(listQueryMode.published)
      autoToast('撤销发布成功', 'success')
    } catch (error) {
      console.error('Unable to unpublish!')
    }
  }
</script>

<template>
  <ul class="mx-2 my-auto flex flex-col text-themeViolet dark:text-darkViolet">
    <li
      v-for="(item, key) in articleList"
      v-show="store.isAllCheckedTagsIn(new Set(item.tags))"
      :key="key"
      class="flex place-content-between border-b border-dashed border-themeViolet p-3 font-Dinkie dark:border-darkViolet"
    >
      <div class="w-full">
        <RouterLink :to="{ name: 'article', params: { id: item.id } }">
          <h1 class="my-1 select-none hover:text-activeFuchsia dark:hover:text-indigo-400">
            {{ item.title }}
          </h1>
        </RouterLink>
        <TagsNav :tags="new Set(item.tags)" class="my-1" />
        <p class="line-clamp-3 w-3/4">{{ item.summary }}</p>
      </div>
      <StatusBar
        :article-id="item.id"
        :show-mode="props.showMode"
        @delete="deleteArticleById(item.id)"
        @publish="publishArticleById(item.id)"
        @revert="revertArticleById(item.id)"
        @unpublish="unpublishArticleById(item.id)"
        @hard-delete="hardDeleteArticleById(item.id)"
      />
    </li>
  </ul>
  <img
    v-if="articleList.length == 0"
    id="placeholder"
    class="m-auto size-36 select-none opacity-60"
    src="/src/assets/graphs/nothing.svg"
  />
</template>

<style scoped></style>
