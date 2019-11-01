module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/variables.scss";`
      }
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
