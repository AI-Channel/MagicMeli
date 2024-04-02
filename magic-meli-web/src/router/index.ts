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
          component: () => import('@/components/BeingPopular.vue')
        },
        {
          path: 'icon',
          meta: {
            isSecondary: false,
            title: 'Icon Test'
          },
          name: 'icon',
          component: () => import('@/components/IconTest.vue')
        },
        {
          path: 'never-fade-away',
          meta: {
            isSecondary: false,
            title: 'Never Fade Away'
          },
          name: 'never fade away',
          component: () => import('@/components/NeverFadeAway.vue')
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
    }
  ]
})

export default router
