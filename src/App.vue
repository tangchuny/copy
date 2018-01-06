<template>
  <div id="app">
    <!-- <div class='nav-box'>
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
    </div> -->

    <!-- 当前索引是：{{$route.meta.index}} -->
    <router-view></router-view>
    
  </div>
</template>

<script>
  
  import axios from 'axios';
  import queryString from 'queryString'
  import './assets/js/public.js'

  var CancelToken = axios.CancelToken;
  var source = CancelToken.source();
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";


  export default {
    name: 'app',
    created(){
    },
    watch: {
      $route (to, from) {
        localStorage.setItem('myCat',JSON.stringify(to));
        if (to.meta.index < from.meta.index) {
          this.names = 'right'
        } else {
          this.names = 'left'
        }
      }
    },
    data () {
      return {
        index: '/index',
        names: 'left'
      }
    },
    methods: {
      ...mapActions('pay', [ 'getOpenId']),
      backHandle () {
        this.$router.back()
      },
      forwarHanle () {
        this.$router.forward()
      },
      goHanle () {
        this.$router.go(-2)
      },
      pushHandle () {
        this.$router.push('/document')
      },
      init() {
        this.getOpenId()
      }
    },
    created() {
      this.init()
    }
  }


</script>
<style>
  .v-enter {
    opacity: 0;
  }
  .v-enter-to {
    opacity: 1;
  }
  .v-enter-active {
    transition: .3s;
  }
  .v-leave {
    opacity:1;
  }
  .v-leave-to {
    opacity:0;
  }
  .v-leave-active {
    transition: .3s;
  }
  /*.left-enter {
    transform:translateX(100%);
  }
  .left-enter-active, .left-leave-active {
    transition: 1s;
  }
  .left-leave-to {
    transform:translateX(-100%);
  }
  .right-enter {
    transform:translateX(-100%);
  }
  .right-enter-active, .right-leave-active {
    transition: 1s;
  }
  .right-leave-to {
    transform:translateX(100%);
  }*/
</style>
