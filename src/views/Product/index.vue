<template>
  <div class="product">
    <van-nav-bar
      left-arrow
      @click-left="onBackAciton"
      fixed
      :border="false"
    />
    <van-tabs
      scrollspy
      sticky
      color="#fbc546"
    >
      <van-tab title="商品">
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="red"
        >
          <van-swipe-item
            v-for="(image, index) in swipeImage"
            :key="index"
          >
            <img
              :src="image"
              alt=""
            >
          </van-swipe-item>
        </van-swipe>
        <van-cell class="productHeader">
          <template #title>
            <div class="price">
              <span>¥{{ storeInfo?.price }}</span>
              <van-icon
                name="share-o"
                size="20"
                class="share"
              />
            </div>
            <div class="title">
              {{ storeInfo?.store_name }}
            </div>
          </template>
          <template #label>
            <span class="productDescription">原价:{{ storeInfo?.ot_price }}¥</span>
            <span class="productDescription">库存:{{ storeInfo?.stock+storeInfo?.unit_name }}</span>
            <span class="productDescription">销量:{{ storeInfo?.sales }}</span>
          </template>
        </van-cell>
        <van-cell
          is-link
          class="sku_window"
          @click="handlePopup"
        >
          <template #title>
            <span>已选择:{{ sku }}</span>
          </template>
        </van-cell>
        <van-popup
          v-model:show="specState.show"
          round
          closeable
          position="bottom"
          class="popup"
        >
          <van-cell-group :border="false">
            <!-- 头部商品信息 -->
            <van-cell
              class="popup-header"
              :border="false"
            >
              <img
                :src="specDetail?.image"
                alt=""
              >
              <div class="info">
                <p class="title">
                  {{ storeInfo?.store_name }}{{ specDetail?.sku }}
                </p>
                <p class="price">
                  ¥{{ specDetail?.price }}
                </p>
                <p class="stock">
                  库存:{{ specDetail?.stock }}
                </p>
              </div>
            </van-cell>
            <!-- 商品规格 -->
            <van-cell
              class="spec"
              :border="false"
              v-for="(product, specIndex) in productAttr"
              :key="product.id"
            >
              <p>{{ product.attr_name }}</p>
              <span
                class="tag"
                v-for="(attrValue ,index) in product.attr_values"
                :class="{ active:specState.spec[specIndex] === attrValue}"
                :key="index"
                @click="handleTagChange(attrValue,specIndex)"
              >{{ attrValue }}
              </span>
            </van-cell>
            <van-cell
              title="数量"
              :border="false"
            >
              <van-stepper
                v-model="specState.buyCount"
                :max="specDetail?.stock"
              />
            </van-cell>
          </van-cell-group>
        </van-popup>
      </van-tab>
      <van-tab
        title="评价"
        v-if="replyCount!==0"
      >
        <van-cell-group class="comment">
          <van-cell
            :title="replyInfo"
            :value="replyRate"
            :to="{
              name: 'comments',
              params:{
                productId:storeInfo?.id
              }
            }"
            is-link
            :border="false"
          />
          <comment-item
            v-if="replyCount!==0"
            :reply="reply"
          />
        </van-cell-group>
      </van-tab>
      <van-tab
        title="推荐"
        v-if="goodList?.length"
      >
        <van-cell class="recommend">
          <p class="title">
            推荐商品
          </p>
          <van-grid
            clickable
            :column-num="3"
            :border="false"
            :center="false"
          >
            <van-grid-item
              v-for="good in goodList"
              :key="good.id"
              :to="{
                name:'product',
                params: {
                  productId: good.id
                }
              }"
            >
              <van-image :src="good.image" />
              <p>{{ good.store_name }}</p>
              <span>¥{{ good.price }}</span>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </van-tab>
      <van-tab
        title="详情"
        v-if="description !== null"
      >
        <van-cell class="description">
          <p class="title">
            商品详情
          </p>
          <div v-html="description" />
        </van-cell>
      </van-tab>
    </van-tabs>
    <van-action-bar>
      <van-action-bar-icon
        icon="chat-o"
        text="客服"
        color="#ee0a24"
      />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        to="/cart"
      />
      <van-action-bar-icon
        icon="star"
        text="已收藏"
        color="#ff5000"
      />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="handleCartAdd"
      />
      <van-action-bar-button
        type="danger"
        text="立即购买"
      />
    </van-action-bar>
  </div>
</template>

<script setup>
import { getProductDeatil } from '@/api/product.js'
import { computed, ref, reactive } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import CommentItem from '@/components/CommentItem.vue'
import { useStore } from 'vuex'
import { addToCart } from '@/api/cart'
import { Toast } from 'vant'
const router = useRouter()
const store = useStore()
const { productId } = defineProps({
  productId: {
    type: String,
    required: true
  }
})
const productDetailData = ref({})

const getProductData = async (productId) => {
  const { data } = await getProductDeatil(productId)
  console.log(data)
  if (data.status === 200) {
    productDetailData.value = data.data
    initSpec(data.data.productAttr)
  } else {
    router.push({
      name: 'home'
    })
  }
}
getProductData(productId)

const storeInfo = computed(() => {
  return productDetailData.value.storeInfo
})

const swipeImage = computed(() => {
  return storeInfo.value?.slider_image
})

const replyCount = computed(() => {
  return productDetailData.value.replyCount || 0
})

const replyInfo = computed(() => {
  return `用户评价(${replyCount.value})`
})

const replyChange = computed(() => {
  return productDetailData.value.replyChance || 0
})

const replyRate = computed(() => {
  return replyChange.value + '% 好评率'
})

const reply = computed(() => {
  return productDetailData.value.reply
})

const goodList = computed(() => {
  return productDetailData.value.good_list
})

const description = computed(() => {
  return productDetailData.value.storeInfo?.description
})

const productAttr = computed(() => {
  return productDetailData.value.productAttr
})

const productValue = computed(() => {
  return productDetailData.value.productValue
})

const specState = reactive({
  show: false,
  spec: [],
  buyCount: 0
})

const sku = computed(() => {
  return specState.spec.toString()
})

const specDetail = computed(() => {
  return productValue.value?.[sku.value]
})

const initSpec = (spec) => {
  specState.spec = spec.map(itme => {
    return itme.attr_values[0]
  })
}

const handlePopup = () => {
  specState.show = !specState.show
}

const handleTagChange = (tag, specIndex) => {
  specState.spec[specIndex] = tag
}

const onBackAciton = () => {
  router.go(-1)
}

const handleCartAdd = async () => {
  if (!store.state.user) {
    return router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.value.fullPath
      }
    })
  }
  if (!specState.show) {
    return specState.show = true
  }
  // 发送请求,将数据加入购物车
  const { data } = await addToCart({
    new: 0,
    productId: productId,
    uniqueId: specDetail.value.uniqueId,
    cartNum: specState.buyCount
  })
  console.log(data)
  if (data.status === 200) {
    Toast.success('添加购物车成功')
    specState.show = false
  } else {
    Toast.fail(data.msg)
  }
}

onBeforeRouteUpdate((to) => {
  productDetailData.value = {}
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  getProductData(to.params.productId)
})

</script>

<style scoped lang="scss">
.van-tabs{
  background-color: #f2f2f2;
  :deep(.van-tabs__wrap){
  position: fixed;
  top:0;
  // width: 80%;
  z-index: 999;
  // left: 50%;
  // transform: translateX(-50%);
  left: 40px;
  width: 295px;
  }
  :deep(.van-tabs__content){
    padding-top: 46px;
  }
  :deep(.productHeader){
    margin-bottom: 10px;
    .van-cell__title{
      .price{
        span{
          font-size: 24px;
          font-weight: 700;
        }
        .share{
          float: right;
        }
      }
      .title{
        font-size: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
        margin: 5px 0 10px;
        text-overflow: ellipsis;
      }
    }
    .van-cell__label{
      display: flex;
      justify-content: space-between;
    }
  }
  :deep(.sku_window){
    margin-bottom: 10px;
  }
  .comment{
    margin-bottom: 10px;
  }
  :deep(.recommend) {
    margin-bottom: 10px;
    .title{
      margin-bottom: 10px;
    }
    .van-grid-item{
      .van-grid-item__content{
        padding:10px 0;
        .van-image{
          display: flex;
          justify-content: center;/*水平居中*/

        }
        img{
          width: 107px;
          height: 107px;
        }
        p{
          padding: 5px 3px 0;
          font-size: 12px;
          line-height: 16px;
          font-weight: 700;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 2;
        }
        span{
          color: #F2270C;
          font-size: 12px;
          font-weight: 700;
        }
      }

    }

  }
  :deep(.description) {
    padding: 10px 0 0;
    width: 100%;
    .title{
      margin-bottom: 10px;
      font-size: 14px;
      padding-left: 16px;
      line-height: 24px;
    }
    div{
      width: 100%;
      img{
        width: 100%;
      }
    }
  }

  :deep(.popup){
    max-height: 70%;
    margin-bottom: 50px;
  }
  .popup-header{
    :deep(.van-cell__value){
      display: flex ;
      margin-top: 30px;
    }
    img{
      width: 75px;
      height: 75px;
      align-self: center;
    }
    .info{
      padding: 10px;
      .title{
        font-size: 14px;
        line-height: 14px;
        font-weight: 700;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 3;
      }
      .price{
        font-size: 16px;
        color: #F2270C;
      }
      .stock{
        font-size: 12px;
        color: #999;
      }
    }

  }
  .spec{
    p{
      margin-bottom: 5px;
    }
    .tag{
      display: inline-block;
      min-width: 25px;
      padding: 0 12px;
      border: 1px solid #ccc;
      border-radius: 20px;
      text-align: center;
      background-color: #f2f2f2;
      margin-right: 10px;
    }
    .tag.active{
      border-color: #f2270c;
      color: #f2270c;
      background-color: #fcedeb;
    }
  }
}

.van-swipe-item{
  img{
    width: 375px;
  }
}
.van-action-bar{
  z-index: 3000;
  width: 100%;
}

</style>
