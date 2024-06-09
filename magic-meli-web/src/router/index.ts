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
      component: () => import('@/App.vue')
    },
    {
      path: '/gallery',
      meta: {
        isListPageCheck: 'gallery',
        title: 'Gallery'
      },
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue'),
      children: [
        {
          path: 'fanart',
          meta: {
            title: 'Fanart'
          },
          name: 'fanart',
          component: () => import('@/components/galleries/FanArt.vue')
        }
      ]
    },
    {
      path: '/setting',
      meta: {
        title: 'Setting'
      },
      name: 'setting',
      component: () => import('@/views/SettingView.vue')
    },
    {
      path: '/markdown-editor',
      meta: {
        title: 'Markdown Editor'
      },
      name: 'markdown editor',
      component: () => import('@/components/MarkdownEditor.vue')
    },
    {
      path: '/recycle-bin',
      meta: {
        isListPageCheck: 'deleted',
        title: 'Recycle Bin'
      },
      name: 'deleted',
      component: () => import('@/views/RecycleView.vue')
    },
    {
      path: '/draft-box',
      meta: {
        isListPageCheck: 'draft',
        title: 'Draft Box'
      },
      name: 'draft',
      component: () => import('@/views/DraftView.vue')
    },
    {
      path: '/login',
      meta: {
        title: 'Login'
      },
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      meta: {
        title: 'Register'
      },
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/articles',
      meta: {
        isListPageCheck: 'articles',
        title: 'Article List'
      },
      name: 'articles',
      component: () => import('@/views/ArticleView.vue'),
      children: [
        {
          path: ':id',
          name: 'article',
          meta: {
            title: 'Article'
          },
          component: () => import('@/components/articles/ArticleContainer.vue')
        }
      ]
    }
  ]
})

export default router
