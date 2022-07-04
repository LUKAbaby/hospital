//配置拦截器


//传送json格式的POST请求
export const postRequest = (url,params) =>{
	return axios({
		method:'post',
		url:`${url}`,
		params:params,
	})
}