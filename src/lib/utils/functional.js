/**
 * 动态加载文件
 *
 * @param options 可选项
 */
export function dynamicLoader(options) {
  const { context, resolver, initialValue } = options
  return context.keys().reduce((previousValue, filename) => {
    return resolver(previousValue, context(filename).default, filename)
  }, initialValue || [])
}
