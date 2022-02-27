<template>
  <div class="comments">
      <van-nav-bar
      title="商品评价"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
    <van-cell-group class="comment" :border="false">
    <!-- 总体评价情况 -->
    <van-cell title="商品评价" :value="`好评率:${state.replyChance}%`" :border="false"></van-cell>
    <!-- 标签切换区域 -->
    <van-cell class="tags" :border="false">
     <van-button
      :class ="{ active: state.isSum }"
      size="small"
      round	
      @click="tagHandle('0')">
      全部({{state.sumCount}})
     </van-button>
    <van-button 
      :class ="{ active: state.isGood }"
      size="small"
      round	
      @click="tagHandle('1')">
      好评({{state.goodCount}})
     </van-button>
    <van-button 
      :class ="{ active: state.isIn }"
      size="small"
      round	
      @click="tagHandle('2')">
      中评({{state.inCount}})
     </van-button>
    <van-button 
      :class ="{ active: state.isPoor }"
      size="small"
      round	
      @click="tagHandle('3')">
      差评({{state.poorCount}})
     </van-button>
    </van-cell>
    <!-- 评价列表 -->
    <div v-if="state.commentList?.length>0">
        <component-item 
        v-for="reply in state.commentList"
        :key="reply.id"
        :reply="reply">
      </component-item>
    </div>
    <van-empty v-else description="没有了哦" />
    </van-cell-group> 
  </div>
</template>

<script setup>
const { productId } = defineProps({
  productId:{
    type: String,
    required: true
  }
})
// 引入接口
import { getCommentCount, getCommentByTag} from '@/api/product'
import { computed, ref, reactive } from 'vue'
import componentItem from '@/components/CommentItem.vue'
import { useRouter} from 'vue-router'

// 存储评论数据
const state = reactive({
  // 存储所有个数信息
  commentCounts: {},
  // 通过计算属性,处理不同类别评论个数
  goodCount: computed(() => {
    return state.commentCounts?.good_count || 0
  }),
  inCount: computed(() => {
    return state.commentCounts?.in_count || 0
  }),
  poorCount: computed(() => {
    return state.commentCounts?.poor_count || 0
  }), 
  sumCount: computed(() => {
    return state.commentCounts?.sum_count || 0
  }),
  replyChance: computed(() => {
    return state.commentCounts?.reply_chance || 0
  }),
  // 评论列表
  commentList: [],
  // 控制显示的评论状态
  active: '0',
  // 通过计算属性,来判断各种类型
  isSum: computed(() =>  state.active === '0' ),
  isGood: computed(() => {
    return state.active === '1'
  }),
  isIn: computed(() => {
    return state.active === '2'
  }),
  isPoor: computed(() => {
    return state.active === '3'
  }),
})
// 请求商品评价
async function  initReplyData () {
  const { data } = await getCommentCount(productId)
  console.log(data)
  if (data.status === 200) {
    state.commentCounts = data.data
  }
}
initReplyData()

// 请求指定类型评价
async function initCommentByTag (type) {
  const{ data } = await getCommentByTag(productId,type)
  // console.log(data)
  if (data.status === 200) {
    state.commentList = data.data
  }
}

initCommentByTag('0')

// 评论点击事件
function tagHandle (tag) {
  state.active = tag
  initCommentByTag(tag)
}

const router = useRouter()
function onClickLeft () {
  router.go(-1)
}

</script>

<style scoped lang="scss">
  .tags{
    .van-button{
      margin-right:10px
    }
  }
  .active{
    background-color:#fbc546
  }
</style>
