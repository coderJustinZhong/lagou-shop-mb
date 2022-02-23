<template>
  <div class="home-main">
    <van-pull-refresh v-model="loading" @refresh="initProductData(true)">
        <van-swipe :autoplay="3000" lazy-render indicator-color="red" class="my-swipe">
            <van-swipe-item v-for="image in swipeData" :key="image.img">
                <img :src="image.img" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :column-num="4">
            <van-grid-item v-for="(menu, index) in menusData" 
            :key="index" 
            :icon="menu.img" 
            :text="menu.info[0].value" />
        </van-grid>
        <van-notice-bar left-icon="volume-o" :scrollable="false" background="#fff" color="#646566">
        <span>热点资讯公告:</span>
        <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :show-indicators="false"
            >   
            <van-swipe-item v-for="(news, index) in newsData" :key="index" v-text="news.chiild[0].val"></van-swipe-item>
        </van-swipe>
        </van-notice-bar>

        <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="initProductData"
        >
            <product-list :product-data="productData"></product-list>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { getDefalutData } from '@/api/index.js'
import ProductList from '@/components/ProductList.vue'
import { getProducts } from '@/api/product.js'
import { computed, ref } from 'vue'
const indexData = ref({})
// 首页数据请求
const initIndexData = async () => {
    const { data } = await getDefalutData()
    if (data.status === 200) {
        indexData.value = data.data
    }
}
initIndexData()
// 轮播图数据
const swipeData = computed(() => {
    return indexData.value.swiperBg?.default.imgList.list
})
// 菜单列表数据
const menusData = computed(() => {
    return indexData.value.menus?.default.imgList.list
})
// 公告数据
const newsData = computed(() => {
    return indexData.value.news?.default.newList.list
})

// 商品列表
const productData = ref([])

const productParams = {
    page:1,
    limit:10
}
// 加载
const loading = ref(false)
const finished = ref(false)
const initProductData = async (isRefreshing) => {
    if(isRefreshing) {
        productParams.page = 1 
        finished.value = false
    }
    const { data } = await getProducts(productParams)
    // console.log(data)
    if(data.status === 200) {
        if (isRefreshing){
            productData.value= []
        }
        productData.value.push(...data.data)
        productParams.page++
        loading.value = false
        // 数据全部加载完成
        if (data.data.length < productParams.limit) {
          finished.value = true
        }
    }
    loading.value = false
}





</script>

<style scoped lang="scss">
    .home-main{
        // padding: 50px 0;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        .my-swipe img{
            width: 100%;
            height: 170px;
        }
        .notice-swipe {
            height: 40px;
            line-height: 40px;
        }
        :deep(.van-notice-bar__content) {
            display: flex;
            align-items: center;
            .van-swipe-item {
                margin-left: 5px;
            }
        }
    }
</style>
