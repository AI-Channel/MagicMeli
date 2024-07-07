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
        isListPageCheck: 'gallery',
        title: 'Gallery'
      },
      name: 'gallery',
      components: { window: () => import('@/views/GalleryView.vue') },
      children: [
        {
          path: 'fanart',
          meta: {
            title: 'Fanart'
          },
          name: 'fanart',
          components: { gallery: () => import('@/components/galleries/FanArt.vue') }
        }
      ]
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
        isListPageCheck: 'deleted',
        title: 'Recycle Bin'
      },
      name: 'deleted',
      components: { window: () => import('@/views/RecycleView.vue') }
    },
    {
      path: '/draft-box',
      meta: {
        isListPageCheck: 'draft',
        title: 'Draft Box'
      },
      name: 'draft',
      components: { window: () => import('@/views/DraftView.vue') }
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
      path: '/articles',
      meta: {
        isListPageCheck: 'articles',
        title: 'Article List'
      },
      name: 'articles',
      components: { window: () => import('@/views/ArticleListView.vue') },
      children: [
        {
          path: ':id',
          name: 'article',
          meta: {
            title: 'Article'
          },
          components: { default: () => import('@/components/articles/ArticleContainer.vue') }
        }
      ]
    }
  ]
})

export default router
