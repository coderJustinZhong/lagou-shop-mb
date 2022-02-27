<template>
  <div class="login">
    <van-nav-bar :border="false">
      <template #left>
        <van-icon
          name="cross"
          size="18"
          @click="backAction"
        />
      </template>
    </van-nav-bar>
    <van-form @submit="loginAction">
      <img
        class="logo"
        :src="state.logoUrl"
        alt=""
      >
      <van-cell-group inset>
        <van-field
          v-model="state.phone"
          name="手机号"
          label="手机号"
          clearable
          center
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            { validator:checkPhone, message: '请输入正确手机号' }
          ]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="密码"
          label="密码"
          center
          clearable
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          v-if="state.isPasswordMode"
        />
        <van-field
          v-else
          v-model="state.captche"
          clearable
          center
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click="sendCaptcha"
              :disabled="state.isCounting"
            >
              {{ state.countDownText }}
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
        >
          登录
        </van-button>
        <span
          class="change-button"
          @click="state.isPasswordMode=!state.isPasswordMode"
        >{{ state.changeText }}</span>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { verifyCode, getVerifyCode, loginWithPassword } from '@/api/user.js'
// import { getLogo } from '@/api/index.js'
import { Toast } from 'vant'
import { useCountDown } from '@vant/use'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()
const state = reactive({
  phone: '',
  password: '',
  captche: '',
  isPasswordMode: true,
  changeText: computed(() => {
    return state.isPasswordMode ? '快速登录' : '密码登录'
  }),
  countDown: null,
  isCounting: false,
  countDownText: computed(() => {
    if (state.isCounting) {
      return '等待' + state.countDown.seconds + '秒'
    } else {
      return '获取验证码'
    }
  }),
  logoUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
})

// 手机号正则匹配
const checkPhone = (val) => {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val)
}

// 获取logo图
// const getLogoData = async () => {
//   const { data } = await getLogo()
//   if (data.status === 200) {

//   }
// }
// getLogoData()
// 发送验证码
const sendCaptcha = async () => {
  const { data } = await verifyCode()
  if (data.status !== 200) {
    return Toast.fail(data.msg)
  }
  const { data: getVerifyCodeData } = await getVerifyCode({
    key: data.data.key,
    phone: state.phone,
    type: 'login'
  })
  console.log(getVerifyCodeData)

  // 计时
  const countDown = useCountDown({
    // 倒计时 24 小时
    time: 10 * 1000,
    onFinish () {
      state.isCounting = false
    }
  })
  countDown.start()
  state.isCounting = true
  state.countDown = countDown.current
}

const loginAction = async () => {
  if (state.isPasswordMode) {
    const { data } = await loginWithPassword({
      account: state.phone,
      password: state.password
    })
    if (data.status === 200) {
      Toast.success('登录成功')
      store.commit('setUser', data.data)
      router.push(route.query.redirect || '/')
      // router.push({
      //   name: 'home'
    // })
    } else {
      return Toast.fail(data.msg)
    }
  }
}
const backAction = () => {
  // if (!store.state.user) {
  //   router.push({ name: 'home' })
  // } else {
  //   router.go(-1)
  // }
  router.go(-1)
}
</script>

<style scoped lang="scss">
.van-form{
  display: flex;
  flex-direction: column;
}
.logo{
  width: 150px;
  height: 150px;
  align-self: center;
  margin: 30px 0 10px;
}
.change-button{
  display: block;
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-top: 20px;
}
</style>
