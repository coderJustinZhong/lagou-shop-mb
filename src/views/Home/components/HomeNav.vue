<template>
  <div class="home-nav">
    <img src="@/assets/logo.png" alt="">
    <div class="search">
      <van-icon name="search" size="0.5rem"></van-icon>
    </div>
    <van-icon name="wap-nav"></van-icon>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
  .home-nav{
    background-color: white;
    position:fixed;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    box-sizing: border-box;
    z-index: 2000;
    img {
      height: 20px;
      padding: 0 10px;
    }
    .search {
      background-color: #f7f7f7;
      // width: 100%;
      flex: 1;
      margin-right:10px;
      border-radius: 25px;
      .van-icon{
        margin-left: 10px;
      }
    }
  }

</style>
