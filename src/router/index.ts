import { createRouter, createWebHistory } from 'vue-router'
import LotteryBrowseViewVue from '@/views/lottery/LotteryBrowseView.vue';
import LotteryAddViewVue from '@/views/lottery/LotteryAddView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LotteryAddViewVue
    },
    {
      path: '/add',
      name: 'add',
      component: LotteryAddViewVue
    },
    {
      path: '/search',
      name: 'search',
      component: LotteryBrowseViewVue
    }
  ]
})

router.beforeEach((to, from, next) => {
  localStorage.setItem('route', to.name);
  next();
});
export default router
