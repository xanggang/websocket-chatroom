import axios from 'axios'
import store from '../store'
const CONFIG = {
  // baseURL: 'http://127.0.0.1:7001',
  timeout: 5000
}
const axiosInstance = axios.create(CONFIG)

interface options {
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  showLoading?: boolean,
  head?: object,
  data?: any,
  showErr?: boolean
}

export default function (options: options) {
  options.showLoading = options.hasOwnProperty('showLoading') ? options.showLoading : true;
  options.showErr = options.hasOwnProperty('showErr') ? options.showErr : true;
  options.showLoading && store.commit('changeLoading', true);
  const token: string | null = window.localStorage.getItem('token');
  const showErr = options.showErr

  let arg :any = {}
  arg.url = options.url
  arg.method = options.method
  arg.method === 'get'
    ? arg.params = options.data
    : arg.data = options.data
  arg.headers = {
    // 'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
  if (token) {
    arg.headers = Object.assign(arg.headers, {token: token})
  }
  if (options.head) {
    arg.headers = Object.assign(arg.headers, options.head)
  }
  return axiosInstance(arg)
    .then(res => {
      options.showLoading && store.commit('changeLoading', false)
      return res.data.detail
    })
    .catch(err => {
      options.showLoading && store.commit('changeLoading', false)
      const message = err.response.data.message
      showErr && store.dispatch('changeToast', {message: message, type: 'err'})
      return Promise.reject(err)
    })
}