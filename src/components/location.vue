
<template>  
      <div class="geoLocation">
          <span><img src="../assets/images/geolocation.png"></span>
          <span  @click="reload"  class="geo">{{city + district + province}}<strong class="siteName">{{street + street_number}}</strong>附近</span>
      </div>
</template>
  
<script>  
import Vue from "vue";
import BMap from 'BMap'  
export default {  
  data: () => ({  
        city: '',
				district: '',
				province: '',
				street: '',
				street_number: '',
  }),  
  mounted () {  
		this.location()
  },  
  methods: {  
    reload() {
			this.location()
		},
    location() {
				let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition((position) => {
					this.city = position.address.city
					this.district = position.address.district
					this.province = position.address.province
					this.street = position.address.street 
					this.street_number = position.address.street_number
					this.type = BMAP_STATUS_SUCCESS
          if (0 === BMAP_STATUS_SUCCESS) {
            // this.getGoodsDetail(position.point.lng, position.point.lat)
          }
          else {
            window.alert('获取失败')
          }
        }, {enableHighAccuracy: true})
		},
  }  
}  
</script>  
  
<style>  
  /* 去掉地图左下角的百度LOGO */  
  .anchorBL {  
    display:none  
  }  
</style>  