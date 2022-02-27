import { createStore } from 'vuex'
import { changeCartNum } from '@/api/cart'

const store = createStore({
  state () {
    return {
      // 用户信息
      user: JSON.parse(window.localStorage.getItem('lagou-edu-mb-token')),
      // 用于存储购物车数据(skuid,checked,count,title,image,price,stock,productId)
      cartList: []
    }
  },
  mutations: {
    // 添加用户
    setUser (state, payload) {
      state.user = payload
      window.localStorage.setItem('lagou-edu-mb-token', JSON.stringify(payload))
    },
    // 购物车功能
    // 添加商品
    addToCart (state, payload) {
      state.cartList.push(payload)
    },
    // 清空购物车
    clear (state) {
      state.cartList = []
    },
    // 商品状态更改
    checkedChange (state, { id, checked }) {
      const currentItem = state.cartList.find(item => item.id === id)
      currentItem.checked = checked
    },
    // 商品个数更改
    countChange (state, { id, count }) {
      const currentItem = state.cartList.find(item => item.id === id)
      currentItem.count = count
    }
  },
  actions: {
    async countChange ({ commit }, payload) {
      // 发送请求
      const { data } = await changeCartNum({
        id: payload.id,
        number: payload.count
      })
      if (data.status === 200) {
        // 提交mutation更改数据
        commit('countChange', payload)
      }
    }
  }
})
export default store
