<template>
  <div class="indentBox" style="margin-bottom:3rem;">
    <div class="personCon">
      <div class="personInfo">
        <div class="personName">
          <span>收款人:</span><span>{{detail.purchase_customer_name}}</span>
        </div>
        <div class="mobile">{{detail.purchase_mobile}}</div>
      </div>
      <div class="shippAddress">
        <span>收获地址：</span>
        <span>{{detail.purchase_address}}</span>
      </div>
      <div class="infoBg"></div>
    </div>
    
    <!-- 采购商品 -->
    <div class="payShop">
        <h3 class="payTitle">{{detail.order_type =='1'? '认购商品': '采购商品'}}</h3>
        <ul class="payShopList" v-for="(item, index) in detail.goods_list" :key="index">
          <li>
            <div class="payShopListImg"><img :src="item.image_url"></div>
            <div class="payShopListText">
              <p>{{item.goods_name}}</p>
              <p>{{item.goods_name}}</p>
              <p>￥{{item.amount}}</p>
            </div>
            <div class="payShopNum">
              <i></i>
              <span>{{item.number}}</span>
            </div>
          </li>
        
        </ul>
    </div>

    <div class="uploadInfo">
      <div class="infoDescribe ">
        <div class="goodsNum">
          <span>订单编号：</span>
          <span>{{detail.id}}</span>
        </div>
        <div class="goodsNum">
          <span>下单时间：</span>
          <span>{{detail.order_time}}</span>
        </div>
        <div class="goodsNum">
          <span>支付方式：</span>
          <span>{{detail.pay_way == '0'? '线下支付': '微信支付'}}</span>
        </div>
        <div class="goodsNum remark">
          <span>备注：</span>
          <span class="errorText">{{errorText}}</span>
        </div>
      </div>
      <ul class="infoImg pb30"> 
        
        <li class="l-flex-v">
          <img :src="imgDataUrl" v-if="imgDataUrl"/>
          <div class="infoImgShow rel" v-else>
          <input type="file" id="file" class="upload_pic" @change='onUpload'>
           </div>
        </li>
      </ul>
    </div>

    <div class="payBtn">     
      <div class="weChatPayBtn" v-if="!canceled" @click="comfirm">确认</div>
      <div class="payCancelBtn" @click="cancel" v-if="!canceled">取消订单</div>
      <div class="payCancelBtn"  v-if="canceled">取消订单</div>
    </div>
    <!-- 弹框 -->
    <div class="provePop" :class="{'none': none }">
      <div class="shade"></div>
      <div class="proveInfo">
        <div class="proveHead">
          <span class="cancelBg" @click="close"></span>
          <h3 class="proveTitle">待上传付款凭证</h3>
        </div>
        <div class="shopName">
          <span>电桩商城</span>
          <span>￥{{detail.pay_amount}}</span>
        </div>
        <div class="proveText">
          <p class="describeText">可通过网银转账、银行汇款等方式转入以下账户，并将付款凭证上传至订单附件中。</p>
          <div class="bankInfo">
            <div class="bankName">
              <span>户名:</span>
              <span v-if="bank">{{bank.list.account_name}}</span>
            </div>
            <div class="bankAccount">
              <span>账号:</span>
              <!-- <span>65<span class="difference">65</span>627<span class="difference">6</span>232<span class="difference">3</span>23232*****</span> -->
              <span v-if="bank" v-for="(item, n) in bankNumber" :key="n" :class="{'difference': item.check}">
                {{item.number}}
              </span>
            </div>
            <div class="bankName2">
              <span>开户行:</span>
              <span v-if="bank">{{bank.list.account_open_name}}</span>
            </div>
          </div>
          <div class="bankPassword">
            <div class="passwordText">请输入普通中的<span>红色</span>数字</div>
            <div class="passwordFrame">
              <input type="text" v-model="number1">
              <input type="text" v-model="number2">
              <input type="text" v-model="number3">
              <input type="text" v-model="number4">
            </div>
          </div>
        </div> 

        <div class="notarizeBtn" @click="comfirmValidate">确认</div>
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue';
  import axios from 'axios';
  import { Swipe, SwipeItem, Toast } from 'mint-ui';
  import { mapState, mapGetters,mapActions} from 'vuex'
   import _ from 'lodash'
import { userOpenId } from '../api/config'

  Vue.component(Swipe.name, Swipe);
  export default {
    name: 'upload',
    data(){
      return {   
        none:false,
        detail: '',
        bank:'',
        number1:'',
        number2: '',
        number3:'',
        number4:'',
        imgDataUrl:'',
        errorText:'',
        canceled: false
      }
    },
    mounted() {
      this.init()
      this.getBank()
    },
    computed: {
      bankNumber() {
         let arr = this.bank.list.account_no.split('')
         let arr2 = this.bank.num_index.split('|')
         let bankarr = []
         for(let i of arr) {
           bankarr.push({
             number: i,
             check:false
           })
         }
         for(let i = 0; i<bankarr.length;i++) {
           for(let j of arr2){
             if(i == j) {
                bankarr[i].check = true
             }
           }
         }
         return bankarr
      }
    },
    methods: {
      init() {
        axios.get(baseUrl + '/shoporder/detail',{
          params:{
             id: this.$route.params.id,
             openId: userOpenId
          }
        }).then((res) => {
          if(res.data.resultCode =='0'){
            this.detail =_.cloneDeep(res.data.obj)
          }
        })
      },
      getBank() {
        axios.get(baseUrl + '/merchantinfo/queryBankAccountInfo',{
          params:{
            openId: userOpenId
          }
        }).then((res) => {
          if(res.data.resultCode =='0'){
            this.bank =_.cloneDeep(res.data.obj)
          }
        })
      },
      onUpload(e){
            if(e.target.files.length>0){  
                this.files = e.target.files[0];  //提交的图片  
                this.getBase64(e.target,(url)=>{  
                    this.imgDataUrl = 'data:image/png;base64,'+url;   //显示的图片  
                });   
            }  
            this.upimg()
      },
      upimg() {
        axios.get(baseUrl + '/uploadproof/uploadProof',{
            params:{
              imgBase64: this.imgDataUrl
            }
          }).then((res) => {
            if(res.data.resultCode =='0'){
              Toast('图片上传成功')
            } else {
              Toast('图片上传失败！请重新上传')
              this.imgDataUrl = ''
              this.errorText='凭证上传有误，请重新上传凭证'
            }
          })
      },
      close() {
        // this.none = true
      },
      comfirmValidate() {
          if(!(this.number1) || !(this.number2) || !(this.number3) || !(this.number4)){
						Toast('请输入红色的校验码');
						return false;
					}
           axios.get(baseUrl + '/merchantinfo/validateBankAccountInfo',{
            params:{
              openId: userOpenId,
              inputNum: this.number1+this.number2+this.number3+this.number4
            }
          }).then((res) => {
            debugger
            if(res.data.resultCode ==='0'){
              this.none = true
              Toast('检验成功！')
            } else {
              Toast('检验失败！')
            }
          })
      },
      cancel() {
        axios.get(baseUrl + '/shoporder/cancel',{
            params:{
              openId: userOpenId,
              id: this.detail.id
            }
          }).then((res) => {
            if(res.data.resultCode =='0'){
              this.canceled = true
            }
          })
      },
      comfirm() {

      },
      getBase64 : function(file,callback){  
            var maxWidth = 640;  
            if(file.files && file.files[0]){  
                var thisFile = file.files[0];  
                if(thisFile.size>2019200){  
                    // mualert.alertBox("图片不能超过800K");  
                    alert("图片不能超过2M");  
                    return  
                };  
                var reader = new FileReader();  
                reader.onload = function(event){  
                    var imgUrl = event.target.result;  
                    var img = new Image();  
                    img.onload = function(){  
                        var canvasId = 'canvasBase64Imgid',  
                        canvas = document.getElementById(canvasId);  
                        if(canvas!=null){document.body.removeChild(canvas);}  
                        var canvas = document.createElement("canvas");  
                        canvas.innerHTML = 'New Canvas';  
                        canvas.setAttribute("id", canvasId);  
                        canvas.style.display='none';  
                        document.body.appendChild(canvas);  
                        canvas.width = this.width;  
                        canvas.height = this.height;  
                        var imageWidth = this.width,   
                        imageHeight = this.height;  
                        if (this.width > maxWidth){  
                            imageWidth = maxWidth;  
                            imageHeight = this.height * maxWidth/this.width;  
                            canvas.width = imageWidth;  
                            canvas.height = imageHeight;  
                        }  
                        var context = canvas.getContext('2d');  
                        context.clearRect(0, 0, imageWidth, imageHeight);  
                        context.drawImage(this, 0, 0, imageWidth, imageHeight);  
                        var base64 = canvas.toDataURL('image/png',1);  
                        var imgbase = base64.substr(22);  
                        callback(imgbase)  
                        //this.imgUrl =   
                    }  
                    img.src = imgUrl;  
                }  
                reader.readAsDataURL(file.files[0]);  
            }  
        },  

    }
  }
</script>
<<style>
.indentBox .payBtn{
  position:fixed;
}
.none{
  display:none;
}
</style>
