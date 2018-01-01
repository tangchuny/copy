<template>
<div class="joinUsBox">
  <div class="joinUs">
    <div class="registerInfo">
      <div class="vipMb">
        <input type="text" placeholder="请输入您注册的会员手机号" v-model='mobile'>
        <button  @click="getMobileVerify">获取验证码</button>
      </div>
      <div class="mbVerify">
        <input type="text" placeholder="请输入手机验证码" v-model='verify'>
      </div>
    </div>
    <div class="bindBtn" @click='weChatBind'>绑定</div>
  </div>
  <div class="bindBox">
    <div class="bindShade" v-show="success">
      <!-- 已经绑定了 -->
      <!-- <div class="bindSucceed">
        <div class="succedImg"><img src="../assets/images/succeedImg.png"></div>
        <p class="succeedText">您的微信已经绑定，无需重复绑定</p>
        <div class="returnBtn">返回</div>
      </div> -->
      <!-- 绑定成功 -->
      <div class="bindSucceed">
        <div class="succedImg"><img src="../assets/images/succeedImg2.png"></div>
        <p class="succeedText">绑定成功</p>
        <div class="returnBtn">返回</div>
      </div>
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
        openid:''标识
       */
      return {
        mobile:'',
        verify:'',
        success:false
      }
    },
    created(){
    },
    methods:{

      //绑定微信验证
      weChatBind(){
        let mobile = this.mobile;
        let verify = this.verify;
        let That = this;

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
            mobileCode:verify,
            openid:'oiaeIwtc5Gedl6t9v6oQi7Y6m99c'
          }
        })
        .then(function(res){
          console.log(res);
          if(res.data.resultCode==='0'){
            Toast('绑定成功');
            That.success = true;
          }else{
            Toast('绑定失败');
          }
        })
      },

      //获取手机验证码
      getMobileVerify(){

        let mobile = this.mobile;
        
        if(!/^1\d{10}$/.test(mobile)){
          Toast('请输入11位正确的手机号');
          return false;
        }

        axios.get(baseUrl+'/shopsys/sendPhMsgCode',{
          params:{
            mobile:mobile
          }
        })
        .then(function(res){
          console.log(res);
          if(res.data.resultCode==='0'){
            Toast('发送成功');
          }else{
            Toast('发送失败');
          }
        })
      }
    }

  }
  
  
</script>