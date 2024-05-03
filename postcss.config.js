module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
      propList: ['*'],
      minPixelValue: 2
    }
  }
}
