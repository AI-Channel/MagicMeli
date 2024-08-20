<script lang="ts" setup>
  import { type ArticleListViewResponse, articleStatusHandles, listQueryMode } from '@/models/article'
  import { autoToast, range } from '@/scripts/libs'
  import { renderInline } from '@/scripts/mdRenderer'
  import {
    getAllTagsByArticleList,
    getArticleList,
    hardDelArticleById,
    updateArticleStatusById
  } from '@/scripts/requests/article'
  import { useArticleStore, useUserStore } from '@/stores/store'
  import { computed, onBeforeMount, onUpdated, ref, type Ref } from 'vue'
  import TagsNav from './TagsNav.vue'
  import StatusBar from './ToolsBar.vue'
  import IconArticle from '../icons/IconArticle.vue'
  import { metaSearch } from '@/scripts/search'
  import { useRoute } from 'vue-router'
  import IconFirst from '../icons/IconFirst.vue'
  import IconPrevious from '../icons/IconPrevious.vue'
  import IconNext from '../icons/IconNext.vue'
  import IconLast from '../icons/IconLast.vue'

  let articleList: Ref<ArticleListViewResponse[]> = ref([])
  let articleListLength: Ref<number> = ref(0)
  const articleStore = useArticleStore()
  const route = useRoute()
  const userStore = useUserStore()
  const props = defineProps<{
    showMode: listQueryMode
  }>()
  const currentPage = computed(() => Number(route.query.page))
  const pageMount = computed(() => Math.ceil(articleListLength.value / 20))

  const listItemShowCase = (item: ArticleListViewResponse) => {
    return articleStore.isContainAllCheckedTags(new Set(item.tags)) && metaSearch(item, articleStore.metaSearchPrompt)
  }

  onBeforeMount(async () => {
    let articleListAndLength
    if (articleStore.searchPrompt)
      articleListAndLength = await getArticleList(props.showMode, currentPage.value, articleStore.searchPrompt)
    else articleListAndLength = await getArticleList(props.showMode, currentPage.value)
    articleList.value = articleListAndLength.articleList
    articleListLength.value = articleListAndLength.articleListLength
    articleStore.currentArticleListLength = articleList.value.length
  })

  onUpdated(async () => {
    articleStore.articleTags = await getAllTagsByArticleList(articleList.value)
  })

  async function deleteArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.delete)
      if (props.showMode == 'published')
        articleList.value = (await getArticleList(listQueryMode.published, currentPage.value)).articleList
      else if (props.showMode == 'draft')
        articleList.value = await (await getArticleList(listQueryMode.draft, currentPage.value)).articleList
      autoToast('删除成功', 'success')
      articleStore.currentArticleListLength--
    } catch (error) {
      console.error('Unable to delete!')
      userStore.isLoggedIn = false
    }
  }

  async function revertArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.revert)
      articleList.value = await (await getArticleList(listQueryMode.deleted, currentPage.value)).articleList
      articleStore.currentArticleListLength--
      autoToast('恢复成功', 'success')
    } catch (error) {
      if ((error as Error).message == 'Request failed with status code 401') userStore.isLoggedIn = false
    }
  }

  async function publishArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.publish)
      articleList.value = await (await getArticleList(listQueryMode.draft, currentPage.value)).articleList
      articleStore.currentArticleListLength--
      autoToast('发布成功', 'success')
    } catch (error) {
      if ((error as Error).message == 'Request failed with status code 401') userStore.isLoggedIn = false
    }
  }

  async function hardDeleteArticleById(id: number) {
    try {
      if (confirm('确定要永久删除此文章吗？')) {
        await hardDelArticleById(id)
        articleStore.currentArticleListLength--
      }
      articleList.value = (await getArticleList(listQueryMode.deleted, currentPage.value)).articleList
    } catch (error) {
      if ((error as Error).message == 'Request failed with status code 401') userStore.isLoggedIn = false
    }
  }

  async function unpublishArticleById(id: number) {
    try {
      await updateArticleStatusById(id, articleStatusHandles.unpublish)
      articleList.value = await (await getArticleList(listQueryMode.published, currentPage.value)).articleList
      articleStore.currentArticleListLength--
      autoToast('撤销发布成功', 'success')
    } catch (error) {
      if ((error as Error).message == 'Request failed with status code 401') userStore.isLoggedIn = false
    }
  }
</script>

<template>
  <ul class="m-auto flex max-w-[1000px] flex-col text-themeViolet dark:text-darkViolet">
    <TransitionGroup name="list" tag="ul" class="mb-4">
      <li
        v-for="(item, key) of articleList"
        v-show="listItemShowCase(item)"
        :key="key"
        class="flex max-w-[1000px] place-content-between place-items-center border-b border-dashed border-themeViolet p-3 font-Dinkie transition-colors hover:bg-themeFuchsia dark:border-darkViolet dark:hover:bg-darkThemeFuchsia"
      >
        <IconArticle :width="48" :height="48" class="mr-3 hidden shrink-0 lg:block" />
        <div class="flex w-full place-content-between place-items-center gap-1">
          <div class="w-full">
            <h1
              class="my-1 w-fit cursor-pointer text-3xl transition-colors hover:text-activeFuchsia dark:hover:text-indigo-400"
              @click="$router.push({ name: 'article', params: { id: item.id } })"
            >
              {{ item.title }}
            </h1>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="line-clamp-3 w-3/4" v-html="renderInline(item.summary)"></p>
          </div>
          <TagsNav :tags="new Set(item.tags)" class="my-1" />
          <span class="hidden text-nowrap lg:inline">{{ new Date(item.updateTime).toLocaleDateString() }}</span>
        </div>
        <StatusBar
          v-if="userStore.isLoggedIn"
          :article-id="item.id"
          :show-mode="props.showMode"
          class="ml-4"
          @delete="deleteArticleById(item.id)"
          @publish="publishArticleById(item.id)"
          @revert="revertArticleById(item.id)"
          @unpublish="unpublishArticleById(item.id)"
          @hard-delete="hardDeleteArticleById(item.id)"
        />
      </li>
    </TransitionGroup>
    <aside
      v-if="currentPage <= pageMount && pageMount > 1"
      class="m-auto flex place-content-center justify-center gap-x-1"
    >
      <RouterLink
        v-if="currentPage > 1"
        :to="{
          name: $route.name,
          query: {
            queryMode: $route.query.queryMode,
            page: 1
          }
        }"
      >
        <IconFirst :width="24" :height="24" />
      </RouterLink>
      <RouterLink
        v-if="currentPage > 1"
        :to="{
          name: $route.name,
          query: {
            page: currentPage - 1
          }
        }"
      >
        <IconPrevious :width="24" :height="24" />
      </RouterLink>
      <RouterLink
        v-for="(pageNum, key) in range(
          currentPage - 4 >= 1 ? currentPage - 4 : 1,
          currentPage + 5 >= pageMount ? pageMount + 1 : currentPage + 6
        )"
        :key="key"
        :to="{ name: $route.name, query: { page: pageNum } }"
        class="px-1 font-Dinkie"
        :class="currentPage == pageNum ? 'bg-themeFuchsia underline underline-offset-2 dark:bg-darkThemeFuchsia' : null"
      >
        <span>{{ pageNum }}</span>
      </RouterLink>
      <RouterLink
        v-if="currentPage < pageMount"
        :to="{
          name: $route.name,
          query: {
            page: currentPage + 1
          }
        }"
      >
        <IconNext :width="24" :height="24" />
      </RouterLink>
      <RouterLink
        v-if="currentPage < pageMount"
        :to="{
          name: $route.name,
          query: {
            page: pageMount
          }
        }"
      >
        <IconLast :width="24" :height="24" />
      </RouterLink>
    </aside>
  </ul>
  <img
    v-if="articleList.length == 0"
    id="placeholder"
    class="m-auto size-36 select-none opacity-60"
    src="/src/assets/graphs/nothing.svg"
    alt="该文章列表是空的"
  />
</template>

<style scoped>
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
  }
</style>
