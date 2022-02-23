import request from '@/utils/request'

// 首页数据
export const getDefalutData = () => {
    return request({
        method: 'GET',
        url:'/v2/diy/get_diy/moren'
    })
}
