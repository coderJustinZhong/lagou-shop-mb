<template>
  <div
    class="user"
    :style="{height:screenHeight}"
  >
    <!-- 头部 -->
    <div class="header">
      <img
        :src="userAvatar"
      >
      <div class="user-info">
        <p
          class="user-name"
          v-text="userName"
        />
        <p
          class="user-id"
          v-text="userID"
        />
      </div>
      <van-icon name="setting-o" />
    </div>
    <!-- 主体 -->
    <div class="main">
      <van-cell-group
        inset
      >
        <van-cell class="user-detail">
          <van-grid
            :border="false"
            :column-num="4"
          >
            <van-grid-item :text="collectCount">
              <template #icon>
                收藏
              </template>
            </van-grid-item>
            <van-grid-item :text="integral">
              <template #icon>
                积分
              </template>
            </van-grid-item>
            <van-grid-item :text="couponCount">
              <template #icon>
                优惠券
              </template>
            </van-grid-item>
            <van-grid-item :text="nowMoney">
              <template #icon>
                余额
              </template>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </van-cell-group>
      <van-cell-group
        inset
        :border="false"
      >
        <van-cell
          title="订单中心"
          is-link
          to="/order"
          value="查看全部"
          :border="false"
        />
        <van-cell>
          <van-grid
            :border="false"
            :column-num="5"
          >
            <van-grid-item
              icon="balance-pay"
              text="待付款"
            />
            <van-grid-item
              icon="send-gift-o"
              text="待发货"
            />
            <van-grid-item
              icon="guide-o"
              text="待收货"
            />
            <van-grid-item
              icon="certificate"
              text="待评价"
            />
            <van-grid-item
              icon="gift-card-o"
              text="已完成"
            />
          </van-grid>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 底部 -->
    <layout-footer />
  </div>
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue'
import { ref, computed, reactive } from 'vue'
import { getUserInfo } from '@/api/user'
import { Toast } from 'vant'
// import { useWindowSize } from '@vant/use'
// const { width, height: screenHeight } = useWindowSize()
// 用户数据
const userData = ref({})
const userAvatar = computed(() => userData.value?.avatar || 'https://img.yzcdn.cn/vant/cat.jpeg')
const userName = computed(() => userData.value?.nickname)
const userID = computed(() => 'ID:' + (userData.value?.uid || ''))
const collectCount = computed(() => userData.value?.collectCount?.toString() || '0')
const integral = computed(() => userData.value?.integral?.toString() || '0')
const couponCount = computed(() => userData.value?.couponCount?.toString() || '0')
const nowMoney = computed(() => userData.value?.now_money?.toString() || '0')

// 屏幕高度
const screenHeight = computed(() => {
  return (window.innerHeight - 50 - 20) + 'px'
})
// 获取用户页数据
const initUserInfo = async () => {
  const { data } = await getUserInfo()
  console.log(data)
  if (data.status === 200) {
    userData.value = data.data
  } else {
    Toast.fail(data.msg)
  }
}
initUserInfo()
</script>

<style scoped lang="scss">
  .user{
    // height: 617px;
    padding: 15px 0;
    background: radial-gradient(circle at 50% -10%,#FBC546 72%,#F6F7F9 72%) #F6F7F9 0 -300px no-repeat;
    .header{
      padding: 0 15px 15px;
      display: flex;
      align-items: center;
      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .user-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .user-name{
          font-size: 14px;
          font-weight: 700;
          padding-bottom: 10px;
        }
        .user-id{
          font-size: 10px;
        }
      }
    }
    .main {
      .van-cell-group{
        margin-bottom: 10px;
      }
      .van-cell.user-detail{
        padding: 0;
        min-height: 74px;
      }
    }
  }
</style>
