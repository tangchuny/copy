<template>
    <div>
   <div class="mapBox">
      <div class="mapShow">
          <div class="virtualMap">
              <div id="allmap" style="width: 100%;height:300px;border: 1px solid gray;overflow:hidden;"></div>  
          </div>
      </div>
  </div> 
    
    <!--container end-->  
  </div>  
</template>  
  
<script>  
import Vue from "vue"
import BMap from 'BMap'  
import axios from 'axios'

export default {
    data: () => ({  
        headerData: {  
        title: '办公地址',  
        toLink: ''  
        },  
        address_detail: null, // 详细地址  
        userlocation: {lng: '', lat: ''}  
    }),  
    props: {
      id: {
      }
    },
    created () {  
        this.getGoodsDetail()
        // 如果在此处直接调用this.ready()方法，将无法加载地图  
    },  
  mounted () {  
  },  
  methods: {  
      //获取商品详情
      getGoodsDetail(){
        let url =  '/subscriptiongoods/getSubscriptionGoodsInfo'
        axios.get(baseUrl + url,{
          params:{
            id: this.id,
          }
        })
        .then((res)=>{
          if(res.data.resultCode==='0'){
            this.userlocation.lng = res.data.obj.goodsInfo.lng
            this.userlocation.lat = res.data.obj.goodsInfo.lat
            this.ready() 
          }
        })
      },
    ready: function () {  
      var th = this  
      var map = new BMap.Map('allmap')  
    //   var point = new BMap.Point(114.0552, 22.55) // 创建点坐标  
      var point = new BMap.Point(this.userlocation.lng || 114.0552, this.userlocation.lat || 22.55) // 创建点坐标  
      map.centerAndZoom(point, 12)  
      map.enableScrollWheelZoom()    // 启用滚轮放大缩小，默认禁用  
      map.enableContinuousZoom()    // 启用地图惯性拖拽，默认禁用  
      map.addControl(new BMap.NavigationControl())  // 添加默认缩放平移控件  
      map.addControl(new BMap.OverviewMapControl()) // 添加默认缩略地图控件  
      map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT' }))   // 右下角，打开  
      // 建立一个自动完成的对象  
      var ac = new BMap.Autocomplete({'input': 'suggestId', 'location': map})  
      var myValue  
      ac.addEventListener('onconfirm', function (e) {    // 鼠标点击下拉列表后的事件  
        var _value = e.item.value  
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business  
        this.address_detail = myValue  
        setPlace()  
      })  
  
      function setPlace () {  
        map.clearOverlays()   // 清除地图上所有覆盖物  
        function myFun () {  
          th.userlocation = local.getResults().getPoi(0).point    // 获取第一个智能搜索的结果  
          map.centerAndZoom(th.userlocation, 19)  
          
          map.addOverlay(new BMap.Marker(th.userlocation))    // 添加标注  
        //   alert(JSON.stringify(th.userlocation))  
        }  
        var local = new BMap.LocalSearch(map, { // 智能搜索  
          onSearchComplete: myFun  
        })  
        local.search(myValue)  
      }  
    }  
  }  
}  
</script>  
  
<style>  
  /* 去掉地图左下角的百度LOGO */  
  .anchorBL {  
    display:none  
  }  
</style>  
