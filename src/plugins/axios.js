import axios from 'axios'
import { useUserStore } from '@/store/user'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API
})
export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})
// 1.呼叫axios.get axios.post時
// 2.interceptors.request請求攔截器
// 3.送出請求
// 4.interceptors.response回應攔截器
// 5.呼叫axios的.then() catch()
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers.authorization = 'Bearer ' + user.token
  return config
})
// 1.getProfile
// 2.如果發生登入逾時錯誤
// 3.傳送舊換新請求
// 4.如果舊換新成功，修改getProfile請求的jwt後重新送出
// 5.如果舊換新失敗，將getProfile的錯誤回傳
// 6.如果不是登入逾時錯誤，將getProfile的錯誤回傳
// axios.interceptors.response.use(成功執行的function,失敗執行的function)
apiAuth.interceptors.response.use(res => {
  return res
}, error => {
  // 如果有收到回應
  if (error.response) {
    // 如果是JWT過期的錯誤、且不是舊換新請求
    if (error.response.data.message === '登入逾時' && error.config.url !== '/users/extend') {
      const user = useUserStore()
      // 傳送JWT舊換新請求
      return apiAuth.patch('/users/extend')
        .then(({ data }) => {
          // 如果舊換新成功，更新user store的JWT
          user.token = data.result
          error.config.headers.authorization = 'Bearer ' + user.token
          // 重新傳送請求
          return axios(error.config)
        })
        .catch(() => {
          // 如果舊換新失敗
          user.logout()
          // 回傳原錯誤到呼叫axios的地方
          return Promise.reject(error)
        })
    }
  }
  // 如果失敗的請求沒回應、或不是過期，回傳原錯誤到呼叫axios的地方
  return Promise.reject(error)
})
