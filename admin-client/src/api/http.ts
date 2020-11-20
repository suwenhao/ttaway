import axios, {AxiosStatic} from 'axios'
import {baseURL} from './config'
import {message} from 'antd'
import StorageModel, { MANAGE_TOKEN } from '../utils/storage'

const Storage = new StorageModel()
/** 
 * 封装axios
 * 
*/
// const token = Storage.get(MANAGE_TOKEN)
export default (self?: any): AxiosStatic => {
  axios.defaults.baseURL = baseURL
  axios.defaults.withCredentials = true //跨域
  //配置发送请求前的拦截器 可以设置token信息 
  axios.interceptors.request.use(config => {
    //loading开始
    if (Storage.get(MANAGE_TOKEN)) {
      config.headers.common['Authorization'] = 'Bearer ' + Storage.get(MANAGE_TOKEN);
    }
    return config;
  }, error => {
    console.log(error)
    message.destroy()
    message.error('请求出错：' + error.message)
    if (self) {
      self.setSatte({
        loading: false
      })
    }
    return Promise.reject(error);
  })

  // 配置响应拦截器 
  axios.interceptors.response.use(res => {
    try {
      if (res.data.erron !== 0) {
        message.destroy()
        message.warning(res.data.message)
      }
      //获取更新的token
      const { authorization } = res.headers;
      //如果token存在则存在localStorage
      authorization && Storage.set(MANAGE_TOKEN, authorization);
    } catch (error) {}
    return Promise.resolve(res);
  }, error => {
    try {
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            message.destroy()
            message.warning('登录状态已失效，请重新登录')
            setTimeout(() => {
              Storage.remove(MANAGE_TOKEN)
              delete axios.defaults.headers['Authorization']
              window.location.href = '/#/login'
            }, 1500)
            return
        }
      }
      return Promise.reject(error.response) // 返回接口返回的错误信息
    } catch (error) {
      window.location.href = '/#/login'
      return Promise.reject(error.response) 
    }
  })
  return axios
}
