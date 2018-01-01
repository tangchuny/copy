<template>
    <div>
   <div class="mapBox">
      <div class="mapShow">
          <div class="searchSite">
              <span class="searchIco"><img src="../assets/images/search.jpg"></span>
              <!-- <input type="text" placeholder="深圳市南山区腾讯大楼"/> -->
              <input v-model="address_detail" type="text" id="suggestId"  name="address_detail" class="mint-field-core text-right">  
              <span class="searchBtn">搜索</span>
          </div>
          <div class="virtualMap">
              <div id="allmap" style="width: 100%;height:500px;border: 1px solid gray;overflow:hidden;"></div>  
          </div>
      </div>
      <div class="mapLocation">
            <div class="geoLocation">
                <location></location>
                <!-- <span class="geo">深圳市<strong class="siteName">南山区腾讯大楼</strong>附近</span> -->
            </div>
            <div class="pullUp"></div>
      </div>
      <div class="mapPlace">
            <div class="place">              
                <div class="placeName">
                    <div class="placeTitle">
                        <span><img src="../assets/images/siteIco.jpg"></span>
                        <span>深圳市南山区科技路充电站</span>
                    </div>
                    <div class="fullName">
                        <p>深圳市南山区科技路1119号地王大夏停车场负2楼B区</p>
                        <div class="siteDistance">
                            <span><img src="../assets/images/guide.jpg" alt=""></span>
                            <span>363米</span>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  </div> 
    
    <!--container end-->  
  </div>  
</template>  
  
<script>  
import Vue from "vue"
import BMap from 'BMap'  
import location from './location.vue'
export default {
    components: { location },
    data: () => ({  
        headerData: {  
        title: '办公地址',  
        toLink: ''  
        },  
        address_detail: null, // 详细地址  
        userlocation: {lng: '', lat: ''}  
    }),  
    created () {  
        // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子  
        this.location()
        // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图  
    },  
  mounted () {  
    // this.ready()  
  },  
  methods: {  
    
    location() {
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((position) => {
          if (0 === BMAP_STATUS_SUCCESS) {
              this.userlocation.lng = position.point.lng
              this.userlocation.lat = position.point.lat
              this.ready()
            // this.getGoodsDetail(position.point.lng, position.point.lat)
          }
          else {
            window.alert('获取失败')
          }
        }, {enableHighAccuracy: true})
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
