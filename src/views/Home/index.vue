<template>
  <div class="home-container">
    <home-nav></home-nav>
    <home-main class="home-container"></home-main>
    <layout-footer></layout-footer>
  </div>
</template>


<script setup>
  import LayoutFooter from '@/components/LayoutFooter.vue'
  import HomeMain from './components/HomeMain.vue'
  import HomeNav from './components/HomeNav.vue'
</script>

<style scoped lang="scss">
  .home-container{
    background-color: #f7f7f7;
    .home-main {
      top: 50px;
      bottom: 50px;
    }
  }

</style>
