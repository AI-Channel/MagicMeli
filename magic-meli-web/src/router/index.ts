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
      path: '/article',
      meta: {
        isListPageCheck: 'article',
        title: 'Article List'
      },
      name: 'article',
      component: () => import('@/views/ArticleView.vue'),
      children: [
        {
          path: 'being-popular',
          meta: {
            title: 'Being Popular'
          },
          name: 'being popular',
          component: () => import('@/components/articles/BeingPopular.vue')
        },
        {
          path: 'scp-3999',
          meta: {
            title: 'SCP 3999'
          },
          name: 'scp 3999',
          component: () => import('@/components/articles/SCP3999.vue')
        },
        {
          path: 'never-fade-away',
          meta: {
            title: 'Never Fade Away'
          },
          name: 'never fade away',
          component: () => import('@/components/articles/NeverFadeAway.vue')
        }
      ]
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
        isListPageCheck: 'recycle',
        title: 'Recycle Bin'
      },
      name: 'recycle',
      component: () => import('@/views/RecycleView.vue')
    }
  ]
})

export default router
