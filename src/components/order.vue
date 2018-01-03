<template>
  <div class='doc'>
    <!-- <div class="myOrder">
      <div class="active"></div>
      <div></div>
    </div> -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click.native="change(1)">认购订单</mt-tab-item>
      <mt-tab-item id="2" @click.native="change(2)">采购订单</mt-tab-item>
    </mt-navbar>
        <!-- <div v-if="orderList.list.length == 0 " class="g9 tc mt20">
          暂无数据
        </div> -->
    <!-- tab-container -->
        <div  class="officialStore" v-for="(item, index) in orderList.list" :key="index">
          <div class="storeHead">
            <h3>官方商城</h3>
            <div>
              <span v-if="item.order_status =='0'">待支付</span>
              <span v-if="item.order_status =='1'">待确认</span>
              <span v-if="item.order_status =='2'">支付失败</span>
              <span v-if="item.order_status =='3'">订单自动撤销</span>
              <span v-if="item.order_status =='4'" >主动撤销 </span>
              <span v-if="item.order_status =='5'" class="green">已支付（待发货）</span>
              <span v-if="item.order_status =='6'">已发货</span>
              <span v-if="item.order_status =='7'" class="green">已完成 </span>
            </div>
          </div>

          <div class="storeContent bbc" v-for="(sub,subindex) in item.goods_list" :key="subindex">
            <div class="storePic">
              <img src="../assets/images/shop.png">
            </div>

            <div class="storeText" >
              <p>{{sub.goods_name}}</p>
              <p>￥658.00 <span class="gc ml5">x {{sub.number}}</span></p>
              <p>{{ item.pay_way ==='1'? '微信支付' : '下线支付'}}</p>
            </div>
          </div>
          
          <div class="storePayment pb10 ">
            <div class="payment">
              <span>需要支付:</span>
              <span>￥658.00</span>
            </div>
            <div class="paymentBtn">
              <span @click="$router.push({name:'payUpload', params:{ id: item.id}})" class="red">查看订单</span>
              <span @click="handleCancel(item)" v-if="item.order_status =='0'">取消订单</span>
              <span v-if="item.order_status =='0'" @click="$router.push({name:'payUpload', params:{ id: item.id}})">去支付</span>
              <span v-if="item.order_status =='2'">重新支付</span>
              <span v-if="item.order_status =='4'|| item.order_status =='3'" class="red">已经取消</span>
            </div>
          </div>
        </div>
     
    <publicFooter></publicFooter>
  </div>
  
</template>

<script>

  import Vue from 'vue';
  import axios from 'axios';
  import publicFooter from '@/components/footer.vue';
  import { mapState, mapGetters,mapActions} from 'vuex'
  import { Navbar, TabItem, Toast} from 'mint-ui';

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);


  import Mint from'mint-ui'
  import'mint-ui/lib/style.css'
  Vue.use(Mint);


  export default {
    data(){
      return {
        // cdData:"", //采购数据
        // rgData:'', //认购数据
        selected:"1",
        type: '1',
      }
    },
    components:{
      publicFooter
    },
    computed: {
      ...mapState('order', [ 'orderList', 'cancelRes' ]),
    },
    created(){
      this.init(this.type)
    },
    methods: {
      ...mapActions('order', [ 'getOrder', 'cancelOrder' ]),
      init(item) {
          this.getOrder({
            params: {
              openId:'oiaeIwtc5Gedl6t9v6oQi7Y6m99c',
              currentPage: 1,
              pageSize: 12,
              type: item
            }
          })
      },
      change(item) {
          this.type = item
          this.init(item)
      },
      handleCancel(item) {
        this.cancelOrder({
          params: {
            openId:'oiaeIwtc5Gedl6t9v6oQi7Y6m99c',
            id: item.id,
          }
        }).then((res) => {
          if (this.cancelRes) {
             Toast("取消订单成功！")
             this.init(this.type)
          }
          
        })
       
      }
    }
  }
</script>
<style>
.mint-navbar .mint-tab-item.is-selected {margin-bottom: 0px; border-bottom:3px solid #bf0a14; color: #bf0a14}
.mint-navbar .mint-tab-item {border-bottom: 1px solid #dcdcdc}
</style>
