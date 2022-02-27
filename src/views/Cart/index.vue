<template>
  <div class="cart">
    <!-- 头部nav -->
    <van-nav-bar
      title="购物车"
      :border="false"
    />
    <!-- 购物车列表 -->

    <div
      class="car-list"
      v-if="!isEmpty"
    >
      <cart-item
        v-for="item in cartList"
        :key="item.id"
        :item-data="item"
      />
    </div>
    <van-empty
      description="购物车还没有东西哦"
      v-else
    />
    <!-- 底部总计 -->
    <van-submit-bar
      :price="3050"
      button-text="去结算"
      @submit="onSubmit"
      :safe-area-inset-bottom="false"
    >
      <van-checkbox
        v-model="checkedAll"
      />
    </van-submit-bar>
    <layout-footer />
  </div>
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue'
import { computed, ref } from 'vue'
import CartItem from './components/CartItem.vue'
// 购物车接口
import { getCartList } from '@/api/cart'
import { useStore } from 'vuex'

const store = useStore()

const cartList = computed(() => {
  return store.state.cartList
})
const isEmpty = computed(() => cartList.value.length === 0)
// 初始化购物车数据
const initCartList = async () => {
  const { data } = await getCartList()
  if (data.status !== 200) { return }
  store.commit('clear')
  // await nextTick()
  data.data.valid.forEach(item => {
    store.commit('addToCart', {
      id: item.id,
      checked: true,
      count: item.cart_num,
      image: item.productInfo.image,
      title: item.productInfo.store_name,
      price: item.truePrice,
      stock: item.trueStock,
      productId: item.product_id
    })
  })
}
initCartList()
const checkedAll = ref(true)
</script>

<style scoped lang="scss">
.cart{

  .van-nav-bar{
    position: fixed !important;
    width: 100%;
    top: 0;
  }
  .van-submit-bar{
    bottom: 50px;
  }
  .car-list{
    margin-bottom: 100px;
    margin-top: 50px;
    background-color: #f2f2f2;
  }
}
</style>
