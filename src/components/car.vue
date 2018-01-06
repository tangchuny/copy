<template>
  <div class="about">
    <div class="purchase" >
      <template v-for="(project,v) in list">
      <div class="purchaseHead">
        <div class="purchaseAll car l-flex">
           <div class="cart-item-check " style="margin:0rem 0.2rem 0 0;">
            <a href="javascript:void 0" class="item-check-btn" v-bind:class="{'check': project.checked}" @click="checkAll(v)">
            </a>
          </div>
          <img src="../assets/images/icon.png"/>
          <label class="c-text-35 b g3">{{project.name}}</label>
        </div>
        <div class="purchaseComplete" v-if="project.hasEditor" @click="editor">{{ edit ? '完成': '编辑'}}</div>
      </div>
      <!--认购编辑-->
      <ul class="purchaseShop" v-if="edit">
        <li v-for="(item,value) in project.sub" :key="value">
          <p class="shopPic"><img :src="item.image_url"></p>
          <div class="shopDescribe">
            <div class="shopNum">
              <span class="minusBtn" @click="subtractPrice(item,value, v)"><i></i></span>
              <span class="commodityNum">{{item.number}}</span>
              <span class="plusBtn" @click="addPrice(item,value,v)"><i></i><i></i></span>
            </div>
            <p>{{item.goods_name}}</p>
            <p>￥{{item.unit_price || '0.0'}}</p>
          </div>
          <div class="shopDelete" @click="del(item)">删除</div>
        </li>
      </ul>
     <!--认购完成-->
      <ul class="purchaseShop" v-else>
        <li v-for="(item,value) in project.sub" :key="value" class="l-flex p10 car">
          <div class="cart-item-check" style="margin:0.8rem 0.2rem 0 0;">
            <a href="javascript:void 0" class="item-check-btn" v-bind:class="{'check': item.checked}" @click="selectedProduct(item,v)">
            </a>
          </div>
           <p class="shopPic l-flex-3">

           <img :src="item.image_url"></p>
          <div class="shopDescribe l-flex-6">
            <div class="shopNum c-text-35 b g3">
              {{item.goods_name}}
            </div>
            <p></p>
            <p>￥{{item.unit_price || '0.0'}}<span class="fn gc fr pr10">x {{item.number}}</span></p>
          </div>
        </li>
      </ul>
      </template>
    </div>
    <!-- 全选 -->
    <div class="shopBtnSelect carSelectAll l-flex">
      <div class="purchaseAll l-flex-2 car" style="margin-top:.3rem;">
        <!--  <input type="radio" class="selectShop" :checked="checkedall">
          <label class="c-text-35 b g3">全选</label> -->
      </div>
      <template>
        <div class="l-flex-2 red tr mr10" style="margin-top:.3rem;">合计: {{totalMoney | formatMoney}}</div>
        <div class="shopBtnSelectDelete bgred l-flex-1" @click="pay">结算</div>
      </template>
      <!-- <template v-if="edit">
        <div class="l-flex-1 red"></div>
        <div class="shopBtnSelectDelete bg666 l-flex-1">删除</div>
      </template> -->
    </div>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
import Vue from 'vue'

import _ from 'lodash';
import publicFooter from '@/components/footer.vue';
import axios from 'axios'
import { mapState, mapGetters,mapActions,mapMutations} from 'vuex'
import { Swipe, SwipeItem, Toast } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import { userOpenId } from '../api/config'

export default {
  data () {
    return {
      cgData:'',//采购数据列表
      rgData:'', //认购数据列表
      checked: false,
      checkedAll: false,
      edit: false,
      totalMoney:0,
      types: '1',
      list:[
        {
          name: '认购电桩',
          checked:false,
          hasEditor:true,
          sub:[],
          type: '1',
        },
        {
          name: '采购电桩',
          checked: false,
          hasEditor:false,
          sub:[],
          type: '2',
        }
      ]
    }
  },
  filters: {
      formatMoney(value) {
          return '￥' + value.toFixed(2);
      }
  },
  components:{
    publicFooter,
  },
  created(){
    this.init();
  },
  computed: {
    ...mapState('order', [ 'carList' ]),
    ...mapState('pay', [ 'openId' ])
  },
  methods:{
      ...mapActions('order', [ 'getCarList' ]),
      ...mapMutations('order', [ 'setOrder' ]),
    //请求购物车数据
    init(){
      let that = this;
      debugger
      this.getCarList({
        params:{
          openId: localStorage.getItem('openId')|| this.openId
        }
      })
      .then((res) => {
        if( res) {
            if(res.data.resultCode ==='0'){
                //获取采购列表
                that.list[0].sub = that.carList.filter(function(ele){
                  return ele.type === '1';
                });
                //获取认购列表
                that.list[1].sub = that.carList.filter(function(ele){
                  return ele.type === '2';
                });
            
            } else if(res.data.resultCode === '789999'){
                  this.$router.push({name: 'joinUs'})
              
            }else{
              Toast(res.data.resultMsg);
            }
        }  
      })
    },
    selectedProduct(item,value){
       this.types = this.list[value].type
        if(typeof item.checked == 'undefined') {
              this.$set(item, 'checked', true);
          } else {
              item.checked = !item.checked;
          }
          this.calcToTalPrice(value);
    },
  //计算总额
    calcToTalPrice(value) {
        this.totalMoney = 0;
        this.list[value].sub.forEach((item, index) => {
            if(item.checked) {
                this.totalMoney += (item.unit_price || 1) * item.number;
            }
        });
    },
    checkAll(value) {
      this.types = this.list[value].type
      if (value == 0) {
          this.nocheck(1)
      } else {
          this.nocheck(0)
      }
      this.hascheck(value)
           
    },
    hascheck(value){
      this.list[value].checked = !this.list[value].checked;
            this.list[value].sub.forEach((item, index) => { 
                if(typeof item.checked == 'undefined') {
                    this.$set(item, 'checked', this.list[value].checked );
                } else {
                    item.checked = this.list[value].checked;
                }
            });
            this.calcToTalPrice(value);
    },
    nocheck(index) {
          this.list[index].checked = false
            this.list[index].sub.forEach((item, index) => { 
                if(typeof item.checked == 'undefined') {
                    this.$set(item, 'checked', false );
                } else {
                    item.checked = false
                }
            });
    },
   
    editor() {
        this.edit = !this.edit
    },
    addPrice(item, index, value){
          this.list[value].sub[index].number = this.list[value].sub[index].number + 100;
          this.calcToTalPrice(value)
      },
      subtractPrice(item, index ,value){
        if(parseInt(item.number) >= 100) {
          this.list[value].sub[index].number = this.list[value].sub[index].number - 100;
          this.calcToTalPrice(value)
        }
      },
    del(item, index) {
      let that = this;
       axios.get(baseUrl+'/shopcart/del',{
          params:{
            id: item.id
          }
        }).then(function(res){
          if(res.data.resultCode === '0') {
            that.init()
          }
        })
    },
    pay() {
      let arr = []
      for(let i of this.list){
        for(let j of i.sub){
          if(j.checked){
            arr.push(j)
          }
        }
      }
      let params = {
        type:this.types,
        goods_list: arr,
        totalnumber: this.totalMoney,
      }
      if(this.totalMoney == 0) {
          Toast('请选择商品');
          return
      }
      
      this.setOrder(params)
      this.$router.replace({ name: 'payment' })
    }      
  },
  /*
  beforeCreate () {
    console.log(1)
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next((vm) => {
      vm.test = '改变了'
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  }*/


}
</script>

<style>
</style>
