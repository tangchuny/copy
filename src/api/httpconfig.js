import axios from 'axios'

export const request = (config) => {
  return axios(config)
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error)   // 返回接口返回的错误信息
});
