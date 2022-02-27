import request from '@/utils/request'

// 加入购物车
export const addToCart = (data) => {
  return request({
    method: 'POST',
    url: '/cart/add',
    data
  })
}

// 获取购物车数据
export const getCartList = (parmas) => {
  return request({
    method: 'GET',
    url: '/cart/list',
    parmas
  })
}

// 修改商品个数
export const changeCartNum = (data) => {
  return request({
    method: 'POST',
    url: '/cart/num',
    data
  })
}
