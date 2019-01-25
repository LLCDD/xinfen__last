import axios from 'axios'
import { getToken } from '@/util/token'
import qs from 'qs'
import config from './config'
import router from './router'
import md5 from 'js-md5';
import Vue from 'vue'



// console.log(arr)

// 创建axios实例

const http = axios.create({
  baseURL: config.api_base,
  timeout: 30000,
  transformRequest: [
    function (data, headers) {
      data = data || {}
      data = qs.stringify(data)
      // headers['Authorization'] = getToken()
      // console.log(romde, arr)
      // console.log(localStorage.getItem('token'))
      var arr = '' + localStorage.getItem('token')
      var romde = Math.ceil(Math.random() * 10)
      for (var i = 0; i <= romde; i++) {
        var arr1 = arr.slice(0, i)
      }
      var arr1 = arr1 + 'peak'
      // console.log(arr1)
      headers['token'] = JSON.stringify({ token: localStorage.getItem('token'), variation: md5(arr1), num: romde })
      return data
    }
  ]
})

// request拦截器
http.interceptors.request.use(config => {
  config.data = config.data ? config.data : {}
  if (router.currentRoute && router.currentRoute.meta.requiresAuth) {
    if (localStorage.getItem("token") === '') {

      return Promise.reject('请登录后操作')
    } else {
      return config
    }
  } else {
    return config
  }
})

// respone拦截器
http.interceptors.response.use(
  response => {
    let data = response.data

    let msg = data.message || ''
    if (data.code == 401) {
      // 账号禁用
      Vue.toasted.error(data.message, { icon: 'error' }).goAway(2000)
      localStorage.clear();
      router.replace({ name: 'login' })
      return Promise.reject(new Error(msg))
    } else if (data.code == 403) {
      // console.log(localStorage.getItem("token"))
      // 登录失效 需重新登录
      Vue.toasted.error('登录失效 需重新登录', { icon: 'error' }).goAway(2000)
      localStorage.clear();
      router.replace({ name: 'login' })
      return Promise.reject(new Error(msg))
    } else if (data.code == 400) {
      return Promise.reject(new Error(msg))
    }
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
