import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/components/GoodsList'
import CartList from '@/components/CartList'
import Address from '@/components/Address'
import orderConfirm from '@/components/orderConfirm'
import orderSuccess from '@/components/orderSuccess'

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
    },{
      path: '/address',
      name: 'address',
      component: Address
    },{
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },{
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    }
  ]
})
