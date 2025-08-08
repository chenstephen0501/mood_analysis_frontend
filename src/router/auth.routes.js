export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      guestOnly: true, // 如果你之後加登入驗證可用
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      guestOnly: true, // 如果你之後加登入驗證可用
    },
  },
]