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
      //首页大模块
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
      //区块详情
      {
        path: 'details/blockDetails',
        name: 'BlockDetails',
        component: () => import('@/views/Details/BlockDetails.vue')
      },
      {
        path: 'details/transDetails',
        name: 'TransDetails',
        component: () => import('@/views/Details/TransDetails.vue')
      },
      {
        path: 'details/addressDetails',
        name: 'AddressDetails',
        component: () => import('@/views/Details/AddressDetails.vue')
      },
      //区块信息
      {
        path: 'infor/blockInfor',
        name: 'BlockInfor',
        component: () => import('@/views/Information/BlockInfor.vue')
      },
      {
        path: 'blockStatistics',
        name: 'BlockStatistics',
        component: () => import('@/views/Information/BlockStatistics.vue')
      },
      {
        path: 'positionRanking',
        name: 'PositionRanking',
        component: () => import('@/views/Information/PositionRanking.vue')
      },
      {
        path: 'networkInformation',
        name: 'NetworkInformation',
        component: () => import('@/views/Information/NetworkInformation.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
