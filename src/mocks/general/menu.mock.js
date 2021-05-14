import { useMockAPI } from '@mediinfo-ued/mock'

useMockAPI('/api/general/menu', 'GET', function (req) {
  return [
    {
      icon: 'iconfont iconjiuzhen-s',
      title: '首页',
      color: '#3AA1FE',
      children: [{ title: '控制台', url: '/' }],
    },
    {
      icon: 'iconfont iconxiangmuguanli-s',
      title: '关于我们',
      color: '#74D1FB',
      children: [{ title: '公司介绍', url: '/about' }],
    },
  ]
})
