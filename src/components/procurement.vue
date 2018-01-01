<template>
  <!-- <div class="procurement">
		<ul class="procurementShop">
			<li v-for="item,val in listData">
        <router-link :to="{path:'/cgDetail',query: {id:item.id}}"  event="click">
  				<div class="procurementImg"><img src="../assets/images/procurement.png"></div>
  				<div class="shopDescribeText">
						<p v-text='item.goods_name'></p>
						<p>¥{{item.unit_price}}</p>
						<p>库存数量<span>{{item.stock || '无'}}</span></p>
  				</div>
        </router-link> 
			</li>
		</ul>
  </div> -->
    <div class="procurement">
        <main class="good-list body gray" style="padding-bottom: 1rem;">
          <scroller style="top: 0rem;"
              :on-refresh="loadMore"
              ref="my_scroller">
              <ul class="procurementShop">
              <li v-for="(item,val) in listData" :key="val">
                <div @click.stop="$router.push ({ name: 'rgDetail', params: { id: item.id, types: types }})">
                  <div class="procurementImg"><img src="../assets/images/procurement.png"></div>
                  <div class="shopDescribeText">
                    <p v-text='item.goods_name'></p>
                    <p>¥{{item.unit_price}}</p>
                    <p>库存数量<span>{{item.stock || '无'}}</span></p>
                  </div>
                </div> 
              </li>
            </ul>
			
        </scroller>
			
			</main>
  </div>
</template>

<script>

  import Vue from 'vue'
  import axios from 'axios';
  import { mapState, mapGetters,mapActions} from 'vuex'
  import _ from 'lodash';
  export default {
    data(){
      return {        
        type: 1,
        types: null,
        listData:[],
        searchFilter: {      
            currentPage: 1,      
            pageSize: 5,      
        },  
        loading: false,
      }
    },
    computed: {
      ...mapState('goods', [ 'goodsList' ])
    },
    created(){
    },
    mounted() {
      this.types = this.$route.params.types
      if(this.types) {
        this.init()   
        this.top = 1
        this.bottom = 2
      }
      
    },
    methods: {
      ...mapActions('goods', [ 'getGoodsPage' ]),
      init() {   
        //初始化载入列表      
         //获取商品详情
        let url = this.types == '1'? '/shopindex/getSubGoodsPage' : '/shopindex/getPurGoodsPage'
        axios.get(baseUrl + url,{
           params:{
            currentPage:this.searchFilter.currentPage,
            pageSize:this.searchFilter.pageSize
          }
        })
        .then((res)=>{
          if(res.data.resultCode==='0'){
                this.listData = _.cloneDeep(res.data.obj.list || res.data.obj.page.list)
          }else{
            Toast('服务器获取失败');
          }
        })

      }, 

      getData() {   
        //初始化载入列表      
        this.getGoodsPage({
          params:{
            currentPage:this.searchFilter.currentPage,
            pageSize:this.searchFilter.pageSize
          }
        })
      }, 
      loadMore(done) {
          let start = this.bottom + 1
          this.searchFilter.currentPage++;  //每次加载，页码+1      
          this.getData(this.searchFilter); 
          this.listData = this.listData.concat(this.goodsList.list)
          this.bottom = this.bottom + 10
          done()
      },
      change(params) {
          this.type = params;
      },
      sortBy(key) {
         this.listData = _.sortBy(this.listData, (item) => {
             return item[ key ]
         })
      }
    }

  }
  
  
</script>
<style>
.wrap{
      padding-bottom: .3rem;
}
</style>

