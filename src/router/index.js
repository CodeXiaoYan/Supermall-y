import Vuerouter from 'vue-router';
import Vue from 'vue';

const Home = () => import('@/views/home/Home.vue');
const Cart = () => import('@/views/cart/Cart.vue');
const Category = () => import('@/views/category/Category.vue');
const Profile = () => import('@/views/profile/Profile.vue');
const Detail = () => import('@/views/detail/Detail.vue');
Vue.use(Vuerouter);
const routes = [
  {
    path: '',
    redirect: 'home',
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页',
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车',
    },
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类',
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的',
    },
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      title: '详情页',
    },
  },
];
const router = new Vuerouter({
  routes,
  mode: 'history',
});
router.beforeEach((to, from, next) => {
  next();
  document.title = to.matched[0].meta.title;
});
export default router;
