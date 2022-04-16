let path = require("path");
module.exports = {
	// 取消eslint检查
	lintOnSave: false,
	//代理
	devServer: {
	  proxy: {
	    '/api': {
	      target: "http://localhost:3000",
	      changeOrigin: true,
	      pathRewrite: {
	        '^/api': '/api'
	      }
	    }
	  },
	},
	configureWebpack: (config) => {
    	config.resolve = { 
      		extensions: ['.js', '.json', '.vue'], //自动解析确定的拓展名,使导入模块时不带拓展名
      		alias: {
       	 		'@': path.resolve(__dirname, './src'), // 以后@就表示src文件夹
      		}
    	}
  	}
}