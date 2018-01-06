<template>
  <div >
      <!-- 收货信息 -->
	  <div>
		 
		<div class="paymentInfo " v-if="!isAddress">
				<h3 class="payTitle">收货信息</h3>
				<div class="fromInfo">
						<dl class="fromItem">
								<dt class="fromItemTit">姓名</dt>
								<dd class="fromItemCt">
										<input type="text" v-model.trim="username" placeholder="名字">
								</dd>
						</dl>
						<dl class="fromItem">
								<dt class="fromItemTit">联系电话</dt>
								<dd class="fromItemCt">
										<input type="tel" v-model.trim="tel" placeholder="手机或固定电话">
								</dd>
						</dl>
						<dl class="fromItem" @click="showPicker">
								<dt class="fromItemTit">选择</dt>
								<dd class="fromItemCt selectSite" >
									{{address}}
								</dd>
						</dl>
						<dl class="fromItem inDetail">
								<dt class="fromItemTit">详细地址</dt>
								<dd class="fromItemCt">
										<input type="text" v-model.trim="detail" placeholder="请输入详情街道门牌号等信息">
								</dd>
						</dl>
				</div>
		<my-address :showAddressPicker="showAddressPicker" @save-address="saveAddress" @hide-picker="hidePicker" :init="address">
		</my-address>
		</div>
		<!--有地址-->
		<div class="address payShopList" v-else>
			<table cellspacing="0" @click="$router.replace({name: 'address'})">
				<tbody><tr>
					<td class="col1">LBS</td>
					<td class="col2">
						<p class="person">张起灵 <span>13813918456</span></p>
						<p class="home">收货地址：江苏省南京市江宁区麒麟街道锦绣花园12栋205室</p>
					</td>
					<td class="col3 rel"><span class="wb_arrow"></span></td>
				</tr>
			</tbody>
			</table>
		</div>

		
      <!-- 采购商品 -->
		<div class="payShop">
				<h3 class="payTitle"> <img src="../assets/images/icon.png" width="20" class="mr5"/> {{ type == '1' ? '认购商品' : '采购商品'}}</h3>
				<ul class="payShopList">
					<li v-for="(item,index) in list" :key="index">
						<div class="payShopListImg"><img src="item.image_url"></div>
						<div class="payShopListText">
							<p>{{item.goods_name}}</p>
							<p>{{item.goods_name}}</p>
							<p>￥{{item.unit_price}}</p>
						</div>
						<div class="payShopNum">
							<i></i>
							<span>{{item.number}}</span>
						</div>
					</li>
				</ul>
		</div>
		<!-- <div class="payShop">
				<h3 class="payTitle"><img src="../assets/images/icon.png" width="20" class="mr5"/> 采购商品</h3>
				<ul class="payShopList">
					<li v-for="(item,index) in cgData" :key="index">
						<div class="payShopListImg"><img src="item.image_url"></div>
						<div class="payShopListText">
							<p>{{item.goods_name}}</p>
							<p>{{item.goods_name}}</p>
							<p>￥{{item.unit_price}}</p>
						</div>
						<div class="payShopNum">
							<i></i>
							<span>{{item.number}}</span>
						</div>
					</li>
				</ul>
		</div> -->
	</div>
		<!-- 支付方式 -->
		<div class="payPattern">
			<h3 class="payTitle">支付方式</h3>
			<div class="patternBox">
				<div class="offlinePay" :class="{'payActive': payType == 0}" @click="change(0)">线下支付</div>
				<div class="wechatPay" :class="{'payActive': payType == 1}"  @click="change(1)">微信支付</div>
			</div>
			<div class="payAccount">
				<div class="accountNum">
					<span>合计:</span>
					<span>￥{{totalnumber}}</span>
				</div>
            <Button class="payBtn" type="error" :loading="loading2" @click="confirm">结算</Button>

				<!-- <div  @click="confirm" >结算</div> -->
			</div>
		</div>

		<!--支付弹出窗口-->
		<Modal
			class="c-f"
			v-model="payWindow"
			title="待上传付款凭证"
			:loading="loading"
			width = '100'
			@on-ok="onOk">
			<div class="c-text-3">
				<p class="tc c-text-5 green ">¥ {{totalnumber}}</p>
				<p>可通过网银转账、银行汇款等方式转入以下账户，并将付款凭证上传至订单附件中。</p>
				<p>户名：中国可口可乐有限公司</p>
				<p>账号：<span class="b red">6651 4341  3442 2343 2234</span></p>
				<p>开户行：招商银行上海分行业部</p>
			</div>
		</Modal>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import publicFooter from "@/components/footer.vue";

import { Navbar, TabItem, Toast } from "mint-ui";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import MyAddress from "./address-picker/Address.vue";

import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(Mint);
import _ from "lodash";
import qs from "qs";
import { userOpenId } from "../api/config";
// import WXPay from 'weixin-pay'
import wx from 'weixin-js-sdk'
export default {
  name: "payment",
  components: {
    MyAddress,
    publicFooter
  },
  data() {
    return {
      loading2: false,
      payWindow: false,
      loading: true,
      showAddressPicker: false,
      address: "广东-广州市-越秀区",
      detail: "",
      isAddress: false,
      list: null, //采购数据
      totalnumber: "",
      selected: "1",
      payType: "1",
      type: "",
      username: "",
      tel: ""
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState("order", ["get_order"]),
    ...mapState("pay", ["prePay"])
  },
  methods: {
    ...mapActions("goods", ["postOrder", "getPrePay"]),
    ...mapActions("pay", ["getPrePay"]),
    init() {
      this.list = this.get_order.goods_list;
      this.type = this.get_order.type;
      this.totalnumber = this.get_order.totalnumber;
    },
    change(type) {
      this.payType = type;
    },
    confirm() {
      	if(!(this.username)){
						Toast('姓名不能为空');
						return false;
					}
			if(!/^1\d{10}$/.test(this.tel)){
						Toast('请输入11位正确的手机号');
						return false;
			}
			if(!(this.address)){
						Toast('地址不能为空');
						return false;
			}
			if(!(this.list)){
						Toast('没有选择商品');
						return false;
      }
      this.loading2 = true
      this.submitOrder(this.payType);
    },
    //线下支付
    payOffLine(no) {
      // this.payWindow = true;
      this.$router.push({ name: 'payUpload', params:{id: no}})
    },

    onOk(no) {
     // this.payWindow = false;
      
    },
    //生成订单
    submitOrder(state) {
      for (let item of this.list) {
        item.amount = (item.unit_price || 1) * item.number;
        item.image_url = item.image_url || "0";
        item.goods_address = item.goods_address || "0";
      }
      let data = {
        openId: localStorage.getItem('openId'),
        type: this.get_order.type,
        pay_way: this.payType,
        order_amount: this.totalnumber,
        customer_name: this.username,
        mobile: this.tel,
        address: this.detail,
        goods_list: JSON.stringify(this.list)
      };

      axios
        .get(
          baseUrl + "/shoporder/add",
          { params: data },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then((res) => {
          if (res.data.resultCode === "0") {
            if (state == "1") {
              this._wxpayConfig(res.data.obj.order_no);
              wx.ready(() => {
                this._setWxpayInfo(res.data);
              });
            } else {
              this.payOffLine(res.data.obj.id);
            }
          } else {
            Toast(res.data.resultMsg);
          }
          this.loading2 = false
        });
    },
    //微信支付
    _wxpayConfig(no) {
			 axios.get(
					baseUrl + "/shopweixin/prepay",
					{ params: { order_no: no, openId: localStorage.getItem('openId') } },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        ).then((res) => {
				debugger
        if (res.data.resultCode === "0") {
					let data = res.data.obj
          wx.config({
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ["chooseWXPay"]
          });
        }
      });
    },
    _setWxpayInfo(data) {
      wx.chooseWXPay({
        appId: data.appId,
        timestamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success(res) {
          debugger;
          if (res.errMsg === "chooseWXPay:ok") {
            window.alert("支付成功");
            window.location.reload();
          } else {
            window.alert(" 支付失败");
            window.location.reload();
          }
        },
        cancel() {
          window.alert("支付取消");
          window.location.reload();
        },
        error(res) {
          window.alert("支付失败");
          window.location.reload();
        }
      });
    },

    hidePicker() {
      // 接受子组件关闭popup事件
      this.showAddressPicker = false;
    },
    showPicker() {
      this.showAddressPicker = !this.showAddressPicker;
    },
    saveAddress(val) {
      // 从子组件接受返回所选值 val
      this.address = val;
      this.showAddressPicker = !this.showAddressPicker;
    }
  }
};
</script>
<style scoped>
.height {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mint-cell-wrapper {
  background-image: none;
}
.ivu-btn{
  padding: 0;
  border-radius: 0;
}
</style>