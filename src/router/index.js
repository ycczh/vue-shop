import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/view/GoodsList'
import Address from '@/view/address'
import OrderConfirm from '@/view/orderConfirm'
import OrderSuccess from '@/view/orderSuccess'
import Cart from '@/view/cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
     {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
  ]
})
