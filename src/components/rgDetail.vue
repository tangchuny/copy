<template>
  <div class='index'>
    <div class="detailTop">
      <div class="swiperBox">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,val) in loopImg" :key="val"><img :src="item"></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="detailPrice">
        <div class="c-text-5 ml10 mt10">{{goodsInfo.goods_name}}</div>
        <div class="shopPrice"><span>￥{{goodsInfo.unit_price}}</span>起</div>
        <p v-if="types=='1'"><img src="../assets/images/geo2.jpg" class="geo2">{{goodsInfo.address}}</p>
        <p class="mb20 pb20 tr" v-else><span class=" g8 mr20">库存: {{goodsInfo.stock || '0'}}</span></p>
      </div>
    </div>
     <!-- <div class="selectable detaulBottom detailPrice">
        <span class="hintText">选择:</span>
        <div class="selectableShop" v-if="isSelect">
          <span>{{goodsInfo.goods_name}}</span>
          <span>数量{{goodsInfo.number || '0'}}件</span>
        </div>
        
      </div> -->
      <div v-if="types=='1'">
          <maps :id="$route.params.id"></maps>
      </div>
      <div class="detaulBottom ">
      <div class="selectable detaulBottom bd">
        <span class="hintText"><img src="../assets/images/icon.png" class="img"/></span>
        <div class="selectableShop">
          <span class="c-text-3 g3 b">商品详情</span>
          <!-- <span class="c-f g9 fr pr10" @click="$router.replace({path:'/siteShop'})">进入店铺 > </span> -->
        </div>
      </div>
      <div class="describeShop">
          <div class="pr10 pct100" v-for="(item,index) in loopImg" :key="index"><img :src="item" width="90%" class="mr10 mb10"></div>
          <p>{{description}}</p>
      </div>
      <div class="shopBtn">
        <span  @click="toBuy('1')"><i></i>加入购物车</span>
        <!-- <span><router-link :to="{path:'/car'}" event="click"><i></i>立即购买</router-link></span> -->
        <span  @click="toBuy('2')"><i></i>立即购买</span>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div class="shade" v-show="buy">
      <!-- 确定购买 -->
      <div class="ensureBox">
        <div class="ensureShop">
          <div class="ensureImg"><img src="../assets/images/ensureShop.png"></div>
          <div class="ensureText">
            <p>{{goodsInfo.goods_name}}</p>
            <p>¥{{goodsInfo.low_amount}}</p>
          </div>
          <div>
          <div class="cancelBtn" @click="unBuy"><i></i></div>
          </div>
        </div>
        <div class="ensureSum">
            <div class="sum">认购数量</div>
            <div class="ensureNum">
              <span @click="subtractPrice"><i></i></span>
              <input type="text" v-model="number" v-if="types=='1'">
              <input type="text" v-model="number2"  v-if="types=='2'">
              <span @click="addPrice"><i></i></span>
            </div>          
        </div>
        <div class="ensureBtn" @click="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Swipe, SwipeItem, Toast } from 'mint-ui'
  import axios from 'axios'
  import _ from 'lodash'
  import maps from './mapComponent.vue'
  
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  import { mapState, mapGetters,mapActions,mapMutations} from 'vuex'
  import { userOpenId } from "../api/config";

  export default {
    name: 'rgDetail',
    components: { maps },
    data(){
      /* 
        mobile:手机号
        verify:验证码
       */
      return {
        number:100,
        number2: 1,
        types:'',
        state: '',
        isSelect: false,
        goodsInfo: {},
        buy:false,
        price:1000.01,
        geocoder:'',
        map:'',
        marker:null,
        address:'', //地址
        
        description:'', //描述
        goods_name:'',//商品名称
        low_amount:'',//最低金额
        loopImg:'' //轮播图
      }
    },
    computed: {
      
    },
    mounted(){
      this.types = this.$route.params.types
      if(typeof this.types === 'undefined') {
        this.$router.replace({ name: 'home'})
      } else {
          this.getGoodsDetail()
      }
      //获取路由元信息
    },
    methods:{
      ...mapMutations('order', [ 'setOrder' ]),
      //获取路由元信息
      getMycat(){
        return JSON.parse(localStorage.getItem('myCat'));
      },

      //获取商品详情
      getGoodsDetail(){
        let url = this.types === '1' ? '/subscriptiongoods/getSubscriptionGoodsInfo' : '/purchasegoods/queryPurchaseGoodsInfo'
        axios.get(baseUrl + url,{
          params:{
            id:this.$route.params.id,
          }
        })
        .then((res)=>{
          if(res.data.resultCode==='0'){
            this.goodsInfo = _.cloneDeep(res.data.obj.goodsInfo || res.data.obj.goodInfo);
            this.loopImg = _.cloneDeep(res.data.obj.imageUrlList);
            // this.goodsInfo.number = 100
          }else{
            Toast('服务器获取失败');
          }
        })

      },
      addPrice(){
        if(this.types == '1'){
            this.number = this.number + 100;
        } else {
            this.number2 = this.number2 + 1;
        }
        
      },
      subtractPrice(){
         if(this.types == '1'){
            if(this.number < 100) {
              return
            }
            this.number = this.number - 100;
         } else {
            if(this.number2 < 1) {
              return
            }
            this.number2 = this.number2 - 1;
         }
        
      },
      toBuy(type){
         this.state = type
         this.buy = true;
      },
      unBuy(){
        this.buy = false;
      },
      confirm() {
        if (this.state === '1') {
          this.addCar()
        } else {
          this.topayment()
          
        }
      },
      topayment() {
        this.goodsInfo.goods_id = this.goodsInfo.id
        if(this.types == '1'){
          this.goodsInfo.number = this.number
        } else (
          this.goodsInfo.number = this.number2
        )
        
        let params = {
            type: this.types, //1：采购
            goods_list:[
                this.goodsInfo
            ],
            totalnumber:  (this.goodsInfo.unit_price || 1) * (this.types == '1'? this.number:this.number2)
          }
          this.goodsInfo.amount = params.totalnumber
          this.setOrder(params)
          this.$router.replace({ name: 'payment'})
      },
      //加入购物车
      addCar(){
         axios.get(baseUrl+'/shopcart/add',{
          params:{
            type:this.types,
            goods_id:this.goodsInfo.id, //商品编号
            image_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514117878892&di=6064ebbd12958405cb0efdf6eca2ea15&imgtype=0&src=http%3A%2F%2Fgetimg.jrj.com.cn%2Fimages%2F2015%2F12%2F21cbrimg%2Fone_20151217104449418.jpg',//商品url
            goods_address:this.goodsInfo.address, //商品地址
            unit_price:this.goodsInfo.price || '1',
            goods_name:this.goodsInfo.goods_name,
            number:this.types == '1'? this.number:this.number2,
            amount:(this.goodsInfo.unit_price || 1) * (this.types == '1'? this.number:this.number2),
            openId: userOpenId
          }
        })
        .then((res) => {
          if(res.data.resultCode==='0'){
              this.buy = false;
              this.isSelect = true;
              Toast(res.data.resultMsg);
          }else{
            Toast(res.data.resultMsg);
          }
        })
      }

    }
  }


</script>
