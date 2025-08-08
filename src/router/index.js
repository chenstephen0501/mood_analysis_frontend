// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './auth.routes' // 匯入

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  ...authRoutes, // 把 auth.routes.js 裡的路由展開合併進來
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
