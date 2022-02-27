<template>
  <div>
        <van-cell class="comment-item">
          <div class="user-info">
            <img :src="reply?.avatar" alt="">
            <span class="nickname">{{reply?.nickname}}</span>
            <van-rate
              v-model="star"
              :size="14"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              readonly
            />
          </div>
          <p class="time">{{reply?.add_time}} {{reply?.sku}}</p>
          <p class="comment-conente">{{reply?.comment}}</p>
          <van-grid :column-num="3" :gutter="10" :border="false">
             <van-grid-item v-for="(item, index) in reply?.pics" :key="index">
              <van-image :src="item" />
            </van-grid-item>
          </van-grid>

        </van-cell>
  </div>
</template>

<script setup>
import { computed } from 'vue';

  const { reply } = defineProps({
    reply:{
      type: Object,
      required: true
    }
  })

  const star = computed(() =>{
    return Number(reply?.star)
  })
</script>

<style scoped lang="scss">
  .comment-item{
    padding: 10px 15px 20px;
    .user-info{
      font-size: 13px;
      display: flex;
      align-items: center;
      img{
        width: 28px;
        height: 28px;
      }
      .nickname{
        padding: 0 5px;
      }
    }
    .time{
      font-size: 12px;
      color: #82848f;
      padding: 5px 0;
    }
    .comment-conente{
      font-size: 13px;
      margin-bottom: 10px;
    }
    :deep(.van-grid-item__content){
      padding: 0;

    }

  }
</style>
