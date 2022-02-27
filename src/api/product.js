import request from '@/utils/request'

// 获取商品列表
export const getProducts = (params) => {
  return request({
    method: 'GET',
    url: '/products',
    params
  })
}

// 获取商品详情
export const getProductDeatil = productId => {
  return request({
    method: 'GET',
    url: `/product/detail/${productId}`
  })
}

// 获取评价个数
export const getCommentCount = productId => {
  return request({
    method: 'GET',
    url: `/reply/config/${productId}`
  })
}

// 根据分类获取评价
export const getCommentByTag = (productId, type) => {
  return request({
    method: 'GET',
    url: `/reply/list/${productId}`,
    params: {
      type: type
    }
  })
}
