<template>
  <div class="weChatBind">
    <h3 class="weChatTitle">微信绑定</h3>
    <div class="weChatBg">
      <i class="weChatBgTree"></i>
      <i class="weChatBgMb"></i>
      <i class="rechargeIco"></i>
      <i class="ellipseIco"></i>
    </div>
    <div class="weChatMobile">
      <div class="weChatMbNum">
        <span class="areaCode">+86</span>
        <input type="text" placeholder="手机号" v-model="mobile">
      </div>
      <div class="verificationCode">
        <span class="vcIco"></span><i></i>
        <input type="text" placeholder="验证码" v-model="verify">
        <Button class="vcBtn" type="primary" @click="getMobileVerify" :disabled="disabled || time > 0">{{ text }} </Button>
        <!-- <span  @click="getMobileVerify"  :disabled="disabled || time > 0">获取验证码</span> -->
      </div>
    </div>

    <div class="bindBtn" @click='weChatBind'>绑定</div>

    <div class="bindHint" v-show='success'>
      <div class="bindShade"></div>
      
      <!-- 绑定失败 -->
      <!-- <div class="bindPop">
        <div class="defeatLogo"></div>
        <div class="defeatText">绑定失败</div>
        <div class="remindText">您已经绑定过，无需重复绑定</div>
        <div class="returnBtn">返回</div>
      </div> -->

      <!-- 绑定成功 -->
      <div class="bindPop">
        <div class="succeeLogo"></div>
        <div class="defeatText">绑定成功</div>
        <div class="remindText">您已经绑定成功，可以直接使用</div>
        <div class="returnBtn">返回</div>
      </div>
    </div>
  </div>
</template>
<script>

  import Vue from 'vue'
  import axios from 'axios';
  import { Toast } from 'mint-ui';

  export default {
    data(){
      /* 
        mobile:手机号
        verify:验证码
       */
      return {
        mobile:'',
        verify:'',
        success:false,
        disabled: false,
        time: 0,
        second: 60,
        
      }
    },
    created(){
    },
    computed: {
      text: function () {
        return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
      }
    },
    methods:{

      //绑定微信验证
      weChatBind(){
        let mobile = this.mobile;
        let verify = this.verify;

        if(!/^1\d{10}$/.test(mobile)){
          Toast('请输入11位正确的手机号');
          return false;
        }

        if(verify===''){
          Toast('验证码不能为空');
          return false;
        }

        axios.get(baseUrl+'/shopsys/checkPhMsgCode',{
          params:{
            mobile:mobile,
            mobileCode:verify
          }
        })
        .then((res) => {
          if(res.data.resultCode==='0'){
            Toast('绑定成功');
            this.success = true;
          }else{
            Toast('绑定失败');
          }
        })
      },
      timer: function () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        }else{
        this.disabled = false;
        }
      },
      //获取手机验证码
      getMobileVerify(){
        if(!/^1\d{10}$/.test(this.mobile)){
          Toast('请输入11位正确的手机号');
          return false;
        }
         axios.get(baseUrl+'/shopsys/sendPhMsgCode',{
          params:{
            mobile: this.mobile,
            openId: localStorage.getItem('openId')
          }
        })
        .then((res) => {
          if(res.data.resultCode==='0'){
            this.time = this.second;
            this.timer()
            Toast('发送成功');
          }else{
            Toast('发送失败');
          }
        })
      }
    }
  }
</script>
<<style>
.ivu-btn{
  padding: 0;
}
</style>
