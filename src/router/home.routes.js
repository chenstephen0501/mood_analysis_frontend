export default [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      guestOnly: true, // 如果你之後加登入驗證可用
    },
  },
]