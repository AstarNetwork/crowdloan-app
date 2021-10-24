module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/main.scss";'
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/crowdloan-app/' : './'
};
