import axios from 'axios'
import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api'
})

request.interceptors.request.use(config => {
  if (store.state.user && store.state.user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
})

request.interceptors.response.use(response => {
  if (response.data.status === 410000) {
    router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }
  return response
})

export default request
