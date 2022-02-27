import request from '@/utils/request'

// 首页数据
export const getDefalutData = () => {
  return request({
    method: 'GET',
    url: '/v2/diy/get_diy/moren'
  })
}

// logo 图
export const getLogo = () => {
  return request({
    method: 'GET',
    url: '/wechat/get_logo'
  })
}
