import request from '@/utils/request'

// 获取用户验证码
export const verifyCode = () => {
  return request({
    method: 'GET',
    url: '/verify_code'
  })
}

// 获取短信验证码
export const getVerifyCode = (data) => {
  return request({
    method: 'POST',
    url: '/register/verify',
    data
  })
}

// 密码登录请求
export const loginWithPassword = (data) => {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}

// 验证码登录请求
export const loginWithVerify = (data) => {
  return request({
    method: 'POST',
    url: '/login/mobile',
    data
  })
}

// 获取用户页信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/user'
  })
}
