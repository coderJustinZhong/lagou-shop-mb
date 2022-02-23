import request from '@/utils/request'

// 获取商品列表
export const getProducts = (params) => {
    return request({
        method: 'GET',
        url: '/products',
        params
    })
}