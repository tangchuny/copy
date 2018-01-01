<!--
	作者：442593738@qq.com
	描述：短信验证码组件
-->
<template >
	<div>
		<Button type="primary" v-on:click="run" :disabled="disabled || time > 0">{{ text }} </Button>
	</div> 
</template>
<script>
export default {
 props: {
    second: {
      type: Number,
      default: 60
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  
  data:function () {
   return {
     time: 0
   }
  },
  
  methods: {
  	
    run: function () {
     this.$emit('run');
    },
    
    //开始倒计时
    start: function(){
     this.time = this.second;
     this.timer();
    },
    
    //倒计时结束
    stop: function(){
     this.time = 0;
     this.disabled = false;
    },
    
    //设置不可用
    setBtnDisabled: function(val){
     this.disabled = val;
    },
    
    timer: function () {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }else{
       this.disabled = false;
      }
    }
  },
  computed: {
    text: function () {
      return this.time > 0 ? this.time + 's 后重获取' : '获取验证码';
    }
  }
}
</script>