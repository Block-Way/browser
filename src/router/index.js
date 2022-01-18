import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home/Home.vue'
import NabTab from '@/layouts/tabberLayout.vue'
const routes = [
  {
    path: '/',
    name: 'tab',
    redirect: { name: 'Home' },
    component: NabTab,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About/About.vue')
      },
      {
        path: 'staking',
        name: 'Staking',
        component: () => import('@/views/Staking/Staking.vue')
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: () => import('@/views/Transactions/Transactions.vue')
      },
      {
        path: 'blockDetails',
        name: 'BlockDetails',
        component: () => import('@/views/Details/BlockDetails.vue')
      },
      {
        path: 'transDetails',
        name: 'TransDetails',
        component: () => import('@/views/Details/TransDetails.vue')
      },
      {
        path: 'assets',
        name: 'Assets',
        component: () => import('@/views/Assets/Assets.vue')
      },
      {
        path: 'gov',
        name: 'Gov',
        component: () => import('@/views/Gov/Gov.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
