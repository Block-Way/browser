import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/staking',
    name: 'Staking',
    component: () => import('../views/Staking.vue')
  },
  {
    path: '/blockDetails',
    name: 'blockDetails',
    component: () => import('@/views/BlockDetails.vue')
  },
  {
    path: '/transDetails',
    name: 'transDetails',
    component: () => import('@/views/TransDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
