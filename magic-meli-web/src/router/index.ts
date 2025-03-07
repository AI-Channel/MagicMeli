import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      components: { default: () => import('@/App.vue') }
    },
    {
      path: '/gallery',
      meta: {
        isListShow: true,
        title: 'Gallery'
      },
      name: 'gallery',
      components: { window: () => import('@/views/GalleryView.vue') }
      // children: [
      //   {
      //     path: 'fanart',
      //     meta: {
      //       title: 'Fanart',
      //       isListShow: false
      //     },
      //     name: 'fanart',
      //     components: { gallery: () => import('@/components/galleries/FanArt.vue') }
      //   }
      // ]
    },
    {
      path: '/setting',
      meta: {
        title: 'Setting'
      },
      name: 'setting',
      components: { window: () => import('@/views/SettingView.vue') }
    },
    {
      path: '/markdown-editor',
      meta: {
        title: 'Markdown Editor'
      },
      name: 'markdown editor',
      components: { window: () => import('@/views/EditorView.vue') }
    },
    {
      path: '/recycle-bin',
      meta: {
        isListShow: true,
        isFilterShow: true,
        isClearShow: true,
        title: 'Recycle Bin'
      },
      name: 'deleted',
      components: { window: () => import('@/views/ArticleListView.vue') }
    },
    {
      path: '/draft-box',
      meta: {
        isListShow: true,
        isFilterShow: true,
        isClearShow: false,
        title: 'Draft Box'
      },
      name: 'draft',
      components: { window: () => import('@/views/ArticleListView.vue') }
    },
    {
      path: '/article-search',
      meta: {
        isListShow: true,
        isFilterShow: true,
        isClearShow: false,
        title: 'Article Search'
      },
      name: 'articleSearch',
      components: { window: () => import('@/views/ArticleListView.vue') }
    },
    {
      path: '/login',
      meta: {
        title: 'Login'
      },
      name: 'login',
      components: { window: () => import('@/views/LoginView.vue') }
    },
    {
      path: '/users/:userId',
      name: 'userInfo',
      meta: { title: 'User' },
      components: { window: () => import('@/components/UserInfo.vue') }
    },
    {
      path: '/articles',
      meta: {
        isListShow: true,
        isFilterShow: true,
        isClearShow: false,
        title: 'Article List'
      },
      name: 'articles',
      components: { window: () => import('@/views/ArticleListView.vue') },
      children: [
        {
          path: ':id',
          name: 'article',
          meta: {
            title: 'Article',
            isListShow: false,
            isFilterShow: false
          },
          components: { default: () => import('@/components/articles/ArticleContainer.vue') }
        }
      ]
    },
    {
      path: '/search',
      meta: {
        title: 'Search'
      },
      name: 'search',
      components: { window: () => import('@/views/SearchView.vue') }
    }
  ]
})

export default router
