<template>
  <div class='index'>
    
    <!-- <input type="" v-model='data.mobile' name="">
    <p @click='sendLogin()'>Message is: {{ data.mobile }}</p> -->
    <div class="geoLocation">
      <span><img src="../assets/images/geolocation.png"></span>
      <span class="geo">{{city}}</span>
    </div>
    <div class="swiperBox">
      <mt-swipe :auto="4000">
        <mt-swipe-item  v-for="(item,val) in imgData" :key="val"><img :src="item.URL"></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="wrap">
      <div class="buyBox">
        <h2 class="title">认购专区<span @click.stop="$router.push ({ name: 'procurement', params: { types: '1' }})"  class='more'>更多...</span></h2>
        <ul>
          <li v-for="(item,val) in subData" :key="val">
            <div @click.stop="$router.push ({ name: 'rgDetail', params: { id: item.id, types: '1' }})">
              <img class="pic" src="../assets/images/goodspic.jpg">
              <h3>{{item.goods_name}}</h3>
              <p>{{item.description == null ? '无' : item.description}}</p>
              <p><span @click.stop="$router.push({path: '/map'})"><img src="../assets/images/geo2.jpg" class="geo2">{{item.address}}</span></p>
            </div>  
          </li>
        </ul>
      </div>
      <div class="buyBox">
        <h2 class="title">采购专区<span @click.stop="$router.push ({ name: 'procurement', params: { types: '2' }})"  class='more'>更多...</span></h2>
        <ul>
          <li v-for="(item,value) in buyData" :key="value">
            <div @click.stop="$router.push ({ name: 'rgDetail', params: { id: item.id, types: '2' }})">
              <img class="pic" src="../assets/images/goodspic.jpg">
              <h3 v-text="item.goods_name"></h3>
              <p><span class="price">¥ {{item.unit_price}} 起</span></p>
            </div> 
          </li>
        </ul>
      </div>

      <div style="margin-bottom:2rem;">
        <span @click="$router.push({path: '/weChatBind'})">绑定会员</span>
        <span @click="$router.push({path: '/scanUnderway'})">充电中</span>
        <span @click="$router.push({path: '/startRecharge'})">这边充电</span>
        <span @click="$router.push({path: '/completeRecharge'})">充电订单</span>
        <span @click="$router.push({path: '/siteList'})">附近充电桩</span>
        <span @click="$router.push({path: '/payUpload', params:{ id: '234'}})">地图</span>
      </div>
    </div>
    <publicFooter></publicFooter>
  </div>

</template>



<script>

  import Vue from 'vue';
  import axios from 'axios';
  import { Swipe, SwipeItem } from 'mint-ui';
  import publicFooter from '@/components/footer.vue';
  import { mapState, mapGetters,mapActions} from 'vuex'

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

  export default {

    data(){
      /* 
        buyData:采购商品列表信息
        subData:认购商品列表信息
       */
      return {        
        buyData:null,
        subData:null,
        imgData:'',
        city: '',
				district: '',
				province: '',
				street: '',
				street_number: '',
      }
    },
    components:{
      publicFooter,
    },
 
    created(){
      this.allAjax()
      this.location()
    },
    methods:{
      location() {
				let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((position) => {
					this.city = position.address.city
					this.district = position.address.district
					this.province = position.address.province
					this.street_number = position.address.street_number
        }, {enableHighAccuracy: true})
		},
      //获取采购商品列表信息
      getPur(){
         return axios.get(baseUrl+'/shopindex/getPurGoodsPage',{
          params:{
            currentPage:1,
            pageSize:1
          }
        });
      },
      //获取认购商品列表信息
      getSub(){
        return axios.get(baseUrl+'/shopindex/getSubGoodsPage',{
          params:{
            currentPage:1,
            pageSize:1
          }
        });
      },
      //获取广告图片列表信息
      getAdImg(){
        return axios.get(baseUrl+'/shopindex/getAdImg',{
          params:{
            currentPage:1,
            pageSize:1
          }
        });
      },
      /* 
        acct:获取采购商品列表信息
        perms:/获取认购商品列表信息
        adImg:获取广告图片列表信息
       */
      allAjax(){
        let That = this;
        axios.all([That.getPur(),That.getSub(),That.getAdImg()])
         .then(axios.spread((acct,perms,adImg)=>{
           //当这三个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
            if(acct.data.resultCode === '0'){        
              That.buyData = acct.data.obj.list;
            };
            if(perms.data.resultCode === '0'){        
              
              That.subData = perms.data.obj.page.list;
            }
            if(adImg.data.resultCode === '0'){        
              That.imgData = adImg.data.obj;
            }
           
        }))
      }
    }


  }
  
  
</script>
