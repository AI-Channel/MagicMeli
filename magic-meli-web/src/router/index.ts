import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/article',
      meta: {
        showMenu: true
      },
      name: 'article',
      component: () => import('@/views/ArticleView.vue'),
      children: [
        {
          path: 'icon',
          meta: {
            showMenu: false
          },
          name: 'icon',
          component: () => import('@/components/IconTest.vue')
        },
        {
          path: 'cyberpunk',
          meta: {
            showMenu: false
          },
          name: 'cyberpunk',
          component: () => import('@/components/ArticleTest.vue')
        }
      ]
    }
  ]
})

export default router
