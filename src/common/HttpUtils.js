// import Vue from 'vue'
import axios from 'axios'
import {apiUtils} from './apiUtils'
// import store from '../store'


let temp = 0
/**
 * 拦截请求数据，在请求开始的时候展示loading
 **/

axios.defaults.baseURL = '';

axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})


let that = this;

/**
 * 拦截响应，在响应结束的时候关闭loading
 */
axios.interceptors.response.use(function (response) {
    return response
}, function (err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)'; break
            case 401: err.message = '未授权，请重新登录(401)'; break
            case 403: err.message = '拒绝访问(403)'; break
            case 404: err.message = '请求出错(404)'; break
            case 408: err.message = '请求超时(408)'; break
            case 500: err.message = '服务器错误(500)'; break
            case 501: err.message = '服务未实现(501)'; break
            case 502: err.message = '网络错误(502)'; break
            case 503: err.message = '服务不可用(503)'; break
            case 504: err.message = '网络超时(504)'; break
            case 505: err.message = 'HTTP版本不受支持(505)'; break
            default: err.message = `连接出错(${err.response.status})!`
        }
    } else {
        if (err && err.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
            err.message = '网络连接超时'          // reject这个错误信息
        } else {
            err.message = '连接服务器失败!'
        }
    }
    return Promise.reject(err)
})



/**
 * 暴露请求方法
 * url 请求的链接
 * data 请求的数据
 * loading 是否展示loading
 * header 请求头
 */
export default {
    install (Vue, options) {
        Vue.prototype.$http = (url, data, loading = true, header = {}) => {
            if (url.indexOf('http') === -1 && !url.includes('/api')) {
                url = apiUtils[url]
            }
            let paramData = {
                "TransData": {
                    "InputData": data || {},
                }
            };
            console.log('请求参数 :', url, data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: url || '',
                    headers: Object.assign({
                        timeout: 60 * 1000 * 2,
                        // 'Content-Type': 'application/json',
                        // 'Content-Type': 'multipart/form-data'
                    }, header),
                    timeout: 60 * 1000 * 2,
                    // 'Content-Type': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    data: paramData,
                    loading: loading
                }).then((data) => {
                    console.log('返回参数 :', data)
                    if (data.status && data.status === 200) {
                        resolve(data.data)
                    } else {
                        reject ('网络请求错误')
                    }
                }, (e) => {
                    reject (e.message)
                }).catch((err) => {
                    reject ('网络请求错误')
                })
            })
        }
        
        Vue.prototype.$formData = (url, data, loading = true, header = {}) => {
            if (url.indexOf('http') === -1 && !url.includes('/api')) {
                url = apiUtils[url]
            }
            let paramData = {
                "TransData": {
                    "InputData": data || {},
                }
            };
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: url || '',
                    headers: Object.assign({
                        timeout: 60 * 1000,
                        'Content-Type': 'multipart/form-data',
                        loading: loading
                    }, header),
                    data: data,
                    'loading': loading
                }).then((data) => {
                    if (data.status && data.status === 200) {
                        resolve(data.data)
                    } else {
                        reject ('网络请求错误')
                    }
                }, (e) => {
                    reject (e.message)
                }).catch((err) => {
                    reject ('网络请求错误')
                })
            })
        }
        Vue.prototype.$get = (url, data, loading = true, header = {}) => {
            if (url.indexOf('http') === -1) {
                url = apiUtils[url]
            }
            let paramData = {
                "TransData": {
                    "InputData": data || {},
                }
            };
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    url: url || '',
                    headers: Object.assign({
                        timeout: 60 * 1000 * 2,
                        'Content-Type': 'application/json',
                    }, header),
                    timeout: 60 * 1000 * 2,
                    'Content-Type': 'application/json',
                    params: paramData,
                    loading: loading
                }).then((data) => {
                    if (data.status && data.status === 200) {
                        resolve(data.data)
                    } else {
                        reject ('网络请求错误')
                    }
                }, (e) => {
                    reject (e.message)
                }).catch((err) => {
                    reject ('网络请求错误')
                })
            })
        }

        Vue.prototype.$getWith = (url, data, loading = true, header = {}) => {
            if (url.indexOf('http') === -1) {
                url = apiUtils[url]
            }
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    url: url || '',
                    headers: Object.assign({
                        timeout: 60 * 1000 * 2,
                        'Content-Type': 'application/json',
                    }, header),
                    timeout: 60 * 1000 * 2,
                    'Content-Type': 'application/json',
                    params: data,
                    loading: loading
                }).then((data) => {
                    if (data.status && data.status === 200) {
                        resolve(data.data)
                    } else {
                        reject ('网络请求错误')
                    }
                }, (e) => {
                    reject (e.message)
                }).catch((err) => {
                    reject ('网络请求错误')
                })
            })
        }
    }
}

