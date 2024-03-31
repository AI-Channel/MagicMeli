import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/article',
      meta: {
        showMenu: 'article',
        title: 'Article List'
      },
      name: 'article',
      component: () => import('@/views/ArticleListView.vue'),
      children: [
        {
          path: 'being-popular',
          meta: {
            showMenu: false,
            title: 'Being Popular'
          },
          name: 'being popular',
          component: () => import('@/components/BeingPopular.vue')
        },
        {
          path: 'icon',
          meta: {
            showMenu: false,
            title: 'Icon Test'
          },
          name: 'icon',
          component: () => import('@/components/IconTest.vue')
        },
        {
          path: 'never-fade-away',
          meta: {
            showMenu: false,
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
