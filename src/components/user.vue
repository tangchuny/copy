<template>
  <div class='index'>
    我是user
    <div class='user-list'>
      <router-link style="padding:0 20px;" :to="{path:'/user/'+item.tip+'/'+ item.id,query:{info:'follow'}}" key="index" v-for="(item,index) in userList">{{item.userName}}</router-link>
    </div>
    <div class="userInfo" v-if='userInfo.userName' style='font-size:20px;'>
      <p>姓名：{{userInfo.userName}}</p>
      <p>性别：{{userInfo.sex}}</p>
      <p>爱好：{{userInfo.hobby}}</p>
    </div>
    <hr/>
    <div v-if='userInfo.userName' class="info-list" style="font-size:20px;">
      <router-link exact :to="{path:'',query:{info:'follow',a:1}}">他的关注</router-link>
      <router-link exact to="?info=share">他的分享</router-link>
      <div>
        {{$route.query}}
      </div>
    </div>
  </div>
</template>

<script>
  import {data} from '../assets/js/app.js'

  export default {
    data () {
      return {
        userList: data,
        userInfo: {}
      }
    },
    watch: {
      $route () {
        console.log(this.$route.params.userId)
        this.getData()
      }
    },
    created () {
      this.getData()
      console.log(this.$route)
    },
    methods: {
      getData () {
        let id = this.$route.params.userId
        if (id) {
          console.log(id)
          this.userInfo = this.userList.filter((item) => {
            return item.id === -(-id)
          })[0]
          console.log(this.userInfo)
        } else {
          this.userInfo = {}
        }
        const fn = (a, b) => ({a, b})
        console.log(fn(1, 2))
      }
    }
  }
</script>
<style>

  .isActive {
    background:yellow;
  }
  .activeClass {
    background:pink
  }
  html,body {
    height:2000px;
  }

</style>
