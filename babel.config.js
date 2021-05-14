
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    'lodash',
    [
      'transform-async-to-promises',
      {
        inlineHelpers: true
      }
    ]
  ]
}
