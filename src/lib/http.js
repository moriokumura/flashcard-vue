import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:3000/`,
  headers: {
    'Accept': 'application/json', // do not include '*/*', see https://github.com/rails/rails/issues/8987
    'Content-Type': 'application/json'
  },
  data: {} // needs this `data: {}` for this bug: https://github.com/mzabriskie/axios/issues/362
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    console.log('interceptors.request use token', token)
    if (token != null) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default apiClient
