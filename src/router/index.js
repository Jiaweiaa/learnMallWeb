import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/components/GoodsList'
import CartList from '@/components/CartList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },{
      path: '/CartList',
      name: 'cartList',
      component: CartList
    }
  ]
})
