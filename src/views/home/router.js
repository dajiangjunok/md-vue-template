// 懒加载路由
const Home = () => import('./Home.vue')
export default {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    title: '首页',
    layout: 'user',
  },
  children: [],
}
