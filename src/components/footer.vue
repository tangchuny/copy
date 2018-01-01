<template>
  <div class='nav-box'>
    <ul>
      <li class="home">
        <router-link :to="{path:'/'}" exact active-class="activeClass" event="click">
          <i></i>
          <span>电桩专区</span>
        </router-link>
      </li>
      <li class="car">
        <router-link :to="{path:'/car'}" active-class="activeClass" event="click">
          <i></i>
          <span>购物车</span>
        </router-link>
      </li>
      <li class="order">
        <router-link :to="{path:'/order'}" active-class="activeClass"  event="click">
          <i></i>
          <span>我的订单</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'Footer',
    data(){
      return {}
    }
  }
</script>