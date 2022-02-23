<template>
  <div class="footer">
    <van-tabbar route>
        <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/category" icon="qr">分类</van-tabbar-item>
        <van-tabbar-item replace to="/recommend" icon="cashier-o">推荐</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script  setup>

</script>

<style scoped lang="scss">
.van-tabbar--fixed{
    position: fixed !important;
}
</style>
