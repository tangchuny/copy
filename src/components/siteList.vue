<template>
    <div class="siteList">
				
			<div class="siteTitle">
				<div class="geoLocation" @click="$router.push({path: '/map'})">
						<span><img src="../assets/images/geolocation.png"></span>
						<span v-if="type=='0'" class="geo">{{city + district + province}}<strong class="siteName">{{street + street_number}}</strong>附近</span>
						<Button type="warning" v-else @click="reload">重新定位</Button>

				</div>
				<div class="map">
						<img src="../assets/images/map.png">
				</div>
			</div>

			<scroller style="top: 2rem;"
						:on-refresh="loadMore"
						ref="my_scroller">
			<div class="placeList">
				<div class="pullDown">
								<img src="../assets/images/down.png">
				</div>
				<!-- 列表 -->
				<div class="place" v-for="(item, index) in machineList" :key="index">
					<div class="placeName">
						<div class="placeTitle">
								<span><img src="../assets/images/siteIco.jpg"></span>
								<span>深圳市南山区科技路充电站</span>
						</div>
						<div class="fullName">
								<p>深圳市南山区科技路1119号地王大夏停车场负2楼B区</p>
								<div class="siteDistance">
										<span>距目的地</span>
										<span>360米</span>
								</div>
						</div>
					</div>
					</div>
				</div>
				
			</scroller>
    </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Toast } from "mint-ui";
import axios from "axios";
import _ from 'lodash';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

  export default {
    name: 'site',
  	data() {
			return {
				machineList: [{

				}],
				city: '',
				district: '',
				province: '',
				street: '',
				street_number: '',
				type: null,
			};
  },
  created() {
		this.getGoodsDetail();
		this.location()
  },
  methods: {
    loadMore(done) {
			this.getGoodsDetail()
      done();
		},
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
            this.getGoodsDetail(position.point.lng, position.point.lat)
          }
          else {
            window.alert('获取失败')
          }
        }, {enableHighAccuracy: true})
		},
    //获取路由元信息
    getMycat() {
     	 return JSON.parse(localStorage.getItem("myCat"));
    },
    //获取商品详情
    getGoodsDetail(lng, lat) {
      axios
        .get(baseUrl + "/queryMachine/queryNearbyMachineInfo", {
          params: {
            lng,
            lat,
            distance: "100",
            openId:'oiaeIwtc5Gedl6t9v6oQi7Y6m99c'
          }
        })
        .then(res => {
          if (res.data.resultCode === "0") {
					//	this.machineList = _.cloneDeep(res.data.obj)
          } else {
            Toast("服务器获取失败");
          }
        });
    }
  }
};
</script>
