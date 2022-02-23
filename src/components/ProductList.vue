<template>
  <div class="product-list">
    <van-grid :column-num="2" :border="false" :gutter="10" :center="false">
        <van-grid-item v-for="(product, index) in productData" :key="index" :to="{name: 'product', params:{productId:product.id}}">
            <van-image :src="product.image" height="165"/>
            <p class="title">{{product.store_name}}</p>
            <p class="price">¥{{product.price}}</p>
            <p class="sales">已售{{product.sales}}件</p>
        </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup>
    const { productData } = defineProps({
        productData:{
            type: Object,
            required: true
        }
    })
</script>


<style scoped lang="scss">
    .product-list{
        margin: 10px 0;
        :deep(.van-grid-item__content){
            border-radius: 10px;
            overflow: hidden;
            padding: 0;
            padding-bottom: 10px;
        }
        .title{
            font-size: 14px;
            padding: 5px 5px 0;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .price {
            font-size: 22px;
            padding: 0px 5px ;
            font-weight: 700;
            color: #ee3e3e;
        }
        .sales{
            color: #ccc;
            font-size: 12px;
            padding: 0 5px;
        }
    }
</style>
