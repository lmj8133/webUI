import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DefaultLayout,
      redirect: '/configheader',
      children: [
        {
          path: '/configheader',
          name: 'ConfigHeader',
          component: () => import('@/views/ConfigHeader.vue'),
        },
        {
          path: 'header',
          name: 'Header',
          component: () => import('@/views/Header.vue'),
        }
      ]
    },
  ]
})

export default router
