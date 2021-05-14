/**
 * 默认配置
 *
 * @link https://github.com/chimurai/http-proxy-middleware#http-proxy-options
 * @type {import('http-proxy-middleware').Config}
 */
 const proxyOptions = {
  // 远程地址
	target: 'http://172.19.80.60:31001',
  // 修改请求头的 Origin 为 target 值
  changeOrigin: true
}

/**
 * HTTP 代理配置
 *
 * @link https://cli.vuejs.org/zh/config/#devserver-proxy
 * @type {import('webpack-dev-server').ProxyConfigMap}
 */
module.exports = {
	'/mediinfo-lyra-security-quanxian': {
		...proxyOptions,
		// target: 'http://localhost:30008',
	},
	'/mediinfo-lyra-gonggong-jichuss': {
		...proxyOptions,
		// target: 'http://localhost:30008',
	},
	'/mediinfo-lyra-authserver': {
		...proxyOptions,
		// target: 'http://localhost:30008'
	}
}
