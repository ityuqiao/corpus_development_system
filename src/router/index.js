import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    redirect: '/home/chatbots',
    component: () => import('../views/home/home-page.vue'),
    children: [
      {
        path: 'chatbots',
        name: 'chatbots',
        component: () => import('@/views/home/components/chatbots-cpn.vue')
      },
      {
        path: 'sortAnswer',
        name: 'sortAnswer',
        component: () => import('@/views/home/components/sortAnswer-cpn.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/index-page.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
