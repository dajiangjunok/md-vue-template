const About = () => import('./About.vue')
export default {
  path: '/about',
  name: 'about',
  component: About,
  meta: {
    title: '关于',
    layout: 'user',
  },
  children: [],
}
