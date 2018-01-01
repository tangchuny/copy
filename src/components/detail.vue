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
        <p><span>运费：</span>{{goodsInfo.address}}</p>
      </div>
    </div>
     <div class="selectable detaulBottom detailPrice">
        <span class="hintText">可选:</span>
        <div class="selectableShop">
          <span>是地方郭德纲</span>
          <span>数量{{goodsInfo.number || '0'}}件</span>
        </div>
        
      </div>
    <div class="detaulBottom ">
      <div class="selectable detaulBottom bd">
        <span class="hintText"><img src="../assets/images/icon.png" class="img"/></span>
        <div class="selectableShop">
          <span class="c-text-3 g3 b">店铺名称</span>
          <span class="c-text-3 g9 fr pr10">进入店铺 > </span>
        </div>
      </div>

      <div class="describeShop">
        <div class="describImg"><img src="../assets/images/describ.png"></div>
        <p>{{description}}</p>
      </div>
      <div class="shopBtn">
        <span  @click="toBuy"><i></i>加入购物车</span>
        <span><router-link :to="{path:'/car'}" event="click"><i></i>立即购买</router-link></span>
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
              <input type="text" v-model="goodsInfo.number < 100? 100 : goodsInfo.number">
              <span @click="addPrice"><i></i></span>
            </div>          
        </div>
        <div class="ensureBtn" @click="addCar">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Swipe, SwipeItem, Toast } from 'mint-ui';
  import axios from 'axios';
  import _ from 'lodash';
  import { mapState, mapGetters,mapActions} from 'vuex'

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

  export default {
    data(){
      /* 
        mobile:手机号
        verify:验证码
       */
      return {
        goodsInfo: {},
        buy:false,
        price:1000.01,
        geocoder:'',
        map:'',
        marker:null,
        address:'', //地址
        lat:'', //纬度
        lng:'',  //经度
        description:'', //描述
        goods_name:'',//商品名称
        low_amount:'',//最低金额
        loopImg:'' //轮播图
      }
    },
    created(){
      let that = this;
      that.getGoodsDetail();

      //获取路由元信息
    },
    methods:{

      //获取路由元信息
      getMycat(){
        return JSON.parse(localStorage.getItem('myCat'));
      },

      //获取商品详情
      getGoodsDetail(){
        let Than = this;
        axios.get(baseUrl+'/purchasegoods/queryPurchaseGoodsInfo',{
          params:{
            id:Than.getMycat().query.id,
          }
        })
        .then(function(res){
          if(res.data.resultCode==='0'){
            // Than.lat = res.data.obj.lat;
            // Than.lng = res.data.obj.lng;
            if (res.data.obj.goodInfo.number < 100) {
               res.data.obj.goodInfo.number = 100
            }
            Than.goodsInfo = _.cloneDeep(res.data.obj.goodInfo);
            Than.loopImg = _.cloneDeep(res.data.obj.imageUrlList);
            /* Than.lat = '39.98174';
            Than.lng = '116.31611';
            Than.goods_name = res.data.obj.goodsInfo.goods_name;
            Than.description = res.data.obj.goodsInfo.description || '无';
            Than.address = res.data.obj.goodsInfo.address || '无';
            Than.low_amount = res.data.obj.goodsInfo.low_amount || 0;
            Than.loopImg = res.data.obj.imageUrlList; */
          }else{
            Toast('服务器获取失败');
          }
        })

      },
      addPrice(){
        if (this.goodsInfo.number < 100) {
        }
        this.goodsInfo.number = this.goodsInfo.number + 100;
      },
      subtractPrice(){
        if(this.goodsInfo.number < 100) {
          return
        }
        this.goodsInfo.number = this.goodsInfo.number - 100;
      },
      toBuy(){
        this.buy = true;
      },
      unBuy(){
        this.buy = false;
      },
      //加入购物车
      addCar(){
        let Than = this;
        axios.get(baseUrl+'/shopcart/add',{
          params:{
            type:'2',
            goods_id:Than.getMycat().query.id, //商品编号
            image_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514117878892&di=6064ebbd12958405cb0efdf6eca2ea15&imgtype=0&src=http%3A%2F%2Fgetimg.jrj.com.cn%2Fimages%2F2015%2F12%2F21cbrimg%2Fone_20151217104449418.jpg',//商品url
            goods_address:Than.goodsInfo.address, //商品地址
            unit_price:Than.goodsInfo.price || '0',
            goods_name:Than.goodsInfo.goods_name,
            number:this.goodsInfo.number,
            openId:'oiaeIwtc5Gedl6t9v6oQi7Y6m99c'
          }
        })
        .then(function(res){
          if(res.data.resultCode==='0'){
              Than.buy = false;
              Toast(res.data.resultMsg);
          }else{
            Toast(res.data.resultMsg);
          }
        })
      }

    }
  }


</script>
