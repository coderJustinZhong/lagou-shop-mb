<template>
  <div
    class="cart-item"
    checked-color="#ee0a24"
  >
    <van-checkbox v-model="itemChecked" />
    <div
      class="link"
      @click="handleRouter"
    >
      <img
        :src="itemData.image"
        alt=""
      >

      <div class="info">
        <p
          class="title"
          v-text="itemData.title"
        />
        <p class="detail">
          <span class="price">¥{{ itemData.price }}</span>
          <van-stepper
            v-model="itemCount"
            input-width="40px"
            button-size="30px"
            :max="itemData.stock"
            @click.stop
          />
        </p>
        <p class="delete">
          删除
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const { itemData } = defineProps({
  itemData: {
    type: Object,
    requeired: true
  }
})

const itemChecked = computed({
  get: () => {
    return itemData.checked
  },
  set: (value) => {
    store.commit('checkedChange', { checked: value, id: itemData.id })
  }
})

const itemCount = computed({
  get: () => {
    return itemData.count
  },
  set: (value) => {
    store.dispatch('countChange', { count: value, id: itemData.id })
  }
})

const handleRouter = () => {
  router.push({
    name: 'product',
    params: {
      productId: itemData.productId
    }
  })
}

</script>

<style scoped lang="scss">
.cart-item{
    background-color: #fff;
    height: 90px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    .van-checkbox{
        margin-right: 10px;
    }
    .link{
        display: flex;
        width: 100%;
        img{
            width: 80px;
            height: 80px;
            padding-right: 10px;
            align-self: center;
        }
        .info{
            font-size: 14px;
            width: 100%;

            .title{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 1;
                margin: 5px 0 10px;
            }
            .detail{

                display: flex;
                align-items: center;
                justify-content: space-between;
                .price{
                    font-size: 16px;
                    color: #f2270c;
                }
            }
            .delete{
                float: right;
                font-size: 12px;
                padding: 10px 0 10px 15px;
            }
        }
    }
}
</style>
