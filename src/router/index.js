import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import index from '@/components/index' //电桩专区
import car from '@/components/car' //购物车
import order from '@/components/order' //我的订单
import siteList from '@/components/siteList.vue' //附近电桩列表
import map from '@/components/map.vue' //电桩详情
import detail from '@/components/detail.vue' //认购详情页
import rgDetail from '@/components/rgDetail.vue' //采购详情页
import procurement from '@/components/procurement.vue'
import shopItem from '@/components/shopItem.vue'
import payment from '@/components/payment.vue'
import indent from  '@/components/indent.vue'
import shopping from '@/components/shopping.vue'
import planRecharge from '@/components/planRecharge.vue'
import startRecharge from '@/components/startRecharge.vue'
import completeRecharge from '@/components/completeRecharge.vue'
import siteShop from '@/components/siteShop.vue'
import scanRecharge from '@/components/scanRecharge.vue'
import scanUnderway from '@/components/scanUnderway.vue'
import payUpload from '@/components/payUpload.vue'
import bind from '@/components/bind.vue'
import weChatBind from '@/components/weChatBind.vue' //微信绑定
import joinUs from '@/components/joinUs.vue' //加入我们 会员绑定
import address from '@/components/address.vue' 

let router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'isActive',
  scrollBehavior (to, from, savePosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
  routes: [
    {
      path: '/',
      component: index,
      name: 'home',
      meta: {
        title: '电桩专区'
      }
    },
    {
      path: '/car',
      name: 'car',
      component: car,
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/siteList',
      component: siteList,
      meta: {
        title: '附近电桩'
      }
    },
    {
      path: '/map',
      meta: {
        title: '地图'
      },
      component: map
    },
    {
      path: '/detail',
      component: detail,
      meta: {
        title: '认购专区-商品详情'
      }
    },
    {
      path: '/rgDetail/:id/:types',
      component: rgDetail,
      name: 'rgDetail',
      meta: {
        title: '采购专区-商品详情'
      }
    },
    {
      path: '/procurement/:types',
      name: 'procurement',
      component: procurement,
      meta: {
        title: '采购专区'
      }
    },
    {
      path: '/shopItem',
      component: shopItem
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment,
      meta: {
        title: '订单支付'
      }
    },
    {
      path: '/indent',
      component: indent
    },
    {
      path: '/shopping',
      component: shopping
    },
    {
      path: '/planRecharge',
      component: planRecharge
    },
    {
      path: '/startRecharge',
      component: startRecharge
    },
    {
      path: '/completeRecharge',
      component: completeRecharge
    },
    {
      path: '/siteShop',
      component: siteShop,
      meta: {
        title: '认购专区'
      }
    },
    {
      path: '/scanRecharge',
      component: scanRecharge
    },
    {
      path: '/scanUnderway',
      component: scanUnderway
    },
    {
      path: '/payUpload/:id',
      name: 'payUpload',
      meta: {
        title: '订单详情'
      },
      component: payUpload
    },
    {
      path: '/bind',
      component: bind
    },
    {
      path: '/weChatBind',
      component: weChatBind,
      meta: {
        title: '微信绑定'
      }
    },
    {
      path: '/joinUs',
      component: joinUs,
      meta: {
        title: '加入我们'
      }
    },
    {
      path: '/address',
      name: 'address',
      component: address,
      meta: {
        title: '地址管理'
      }
    },
    {
      path: '/order',
      component: order,
      name: 'order',
      beforeEnter (to, from, next) {
        console.log('beforeEnter')
        next()
      },
      meta: {
        index: 2,
        login: true,
        title: '订单列表'
      }
    },
    {
      path: '*',
      redirect:'/'
      // redirect: (to) => {
      //   if (to.path === '/abc') {
      //     return '/hello'
      //   } else {
      //     return {
      //       name: 'car'
      //     }
      //   }
      // }
    }
  ]
})


router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next()
  /*
  if (to.meta.login) {
    next('/login')
  } else {
    next()
  }
  */
})

/*
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'meta.title'
  }
})
*/

export default router
