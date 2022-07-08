module.exports = {
  lintOnSave: false,
  devServer: { // 环境配置
    host: '0.0.0.0',
    // 公司ip
    public: '173.16.25.201:8081', // 此处是自己电脑IP地址！
    // public: '173.16.25.201:8080', // 此处是自己电脑IP地址！
    port: '8081',
    https: false,
    disableHostCheck: true,
    open: true, // 配置自动启动浏览器
  }

}
