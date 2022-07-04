const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports ={
    devServer:{
        port:8080,
        host:'localhost',
        open:true   ,// 配置浏览器自动访问
		//跨域代理
		proxy:{
			'/':{
				//websocket
				ws:false,
				//目标路径
				target:'http://localhost:8090',
				//允许跨域
				changeOrigin:true,
				//路径重写
				pathRewrite:{
					'^/':'/'
				}
			}
		}
    }
}