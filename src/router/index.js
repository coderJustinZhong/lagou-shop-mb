import { createHydrationRenderer } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue')
    },
    {
        path: '/category',
        name: 'category',
        component: () => import('@/views/Category/index.vue')
    },
    {
        path: '/category-detail/:categoryId',
        name: 'category-detail',
        component: () => import('@/views/CategoryDetail/index.vue'),
        props: true
    },
    {
        path: '/order-confirm',
        name: 'order-confirm',
        component: () => import('@/views/OrderConfirm/index.vue')
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('@/views/Order/index.vue')
    },
    {
        path: '/order-detail/:orderId',
        name: 'order-detail',
        component: () => import('@/views/OrderDetail/index.vue'),
        props: true
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('@/views/Pay/index.vue'),
    },
    {
        path: '/product/:productId',
        name: 'product',
        component: () => import('@/views/product/index.vue'),
        props: true
    },
    {
        path: '/comment/:productId',
        name: 'comment',
        component: () => import('@/views/Comment/index.vue'),
        props: true
    },
    {
        path: '/recommend',
        name: 'recommend',
        component: () => import('@/views/Recommend/index.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/Cart/index.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/Search/index.vue')
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/User/index.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFound/index.vue')
    }
  ]


// 创建router实例
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router