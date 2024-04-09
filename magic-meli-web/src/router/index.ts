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
        isSecondary: 'article',
        title: 'Article List'
      },
      name: 'article',
      component: () => import('@/views/ArticleView.vue'),
      children: [
        {
          path: 'being-popular',
          meta: {
            isSecondary: false,
            title: 'Being Popular'
          },
          name: 'being popular',
          component: () => import('@/components/articles/BeingPopular.vue')
        },
        {
          path: 'scp-3999',
          meta: {
            isSecondary: false,
            title: 'SCP 3999'
          },
          name: 'scp 3999',
          component: () => import('@/components/articles/SCP3999.vue')
        },
        {
          path: 'never-fade-away',
          meta: {
            isSecondary: false,
            title: 'Never Fade Away'
          },
          name: 'never fade away',
          component: () => import('@/components/articles/NeverFadeAway.vue')
        },
        {
          path: 'markdown-editor-test',
          meta: {
            isSecondary: false,
            title: 'Markdown Editor'
          },
          name: 'markdown editor',
          component: () => import('@/components/articles/MarkdownEditor.vue')
        }
      ]
    },
    {
      path: '/gallery',
      meta: {
        title: 'Gallery'
      },
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue')
    },
    {
      path: '/setting',
      meta: {
        title: 'Setting'
      },
      name: 'setting',
      component: () => import('@/views/SettingView.vue')
    }
  ]
})

export default router
