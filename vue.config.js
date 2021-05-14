const size = require('lodash/size')

const proxyTable = require('./config/proxy')
const configureWebpack = require('./config/webpack.config')

const isProd = process.env.NODE_ENV === 'production'
const publicPath = process.env.VUE_APP_PUBLIC_PATH

// 需要编译优化的依赖
const optimizeDeps = []

if (isProd) {
	optimizeDeps.push(
		'@mediinfo-ued/medi-hooks',
		'@mediinfo-ued/medi-ui',
		'@mediinfo-ued/medi-ui-pro'
	)
}

module.exports = {
	publicPath: publicPath,
	assetsDir: 'static',
	lintOnSave: false,
	productionSourceMap: isProd,
	transpileDependencies: optimizeDeps,
	configureWebpack,
	devServer: {
		port: 3000,
		proxy: size(proxyTable) > 0 ? proxyTable : undefined
	},
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'services': '@/services',
        'views': '@/views',
      }
    }
  }
}
