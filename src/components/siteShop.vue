<template>
    <div class="flex tab">
      <nav class="tab-nav rel">
		       <a href="javascript:;" @click="change(1)"  class="tab-title" :class="{'active': type==1}">推荐商品</a>
		       <a href="javascript:;" @click="change(2)" class="tab-title" :class="{'active': type==2}">人气商品</a>
		       <a href="javascript:;" @click="change(3)" class="tab-title" :class="{'active': type==3}">火爆商品</a>
		    </nav>
        <main class="good-list body gray" style="padding-bottom: 1rem;">
          <scroller style="top: 1rem;"
              :on-refresh="loadMore"
              ref="my_scroller">
				<section class="good-item" v-for="(item,val) in listData" :key="val">
          <router-link :to="{path:'/cgDetail',query: {id:item.id}}"  event="click">
            <div class="wrap">
              <a class="good-img" href="javascript:void(0)"><img src="../assets/img/sy_but_mangguo.png" alt="商品图片"></a>
              <h4 class="good-name ellipsis-2">{{item.goods_name}}</h4>
              <p class="good-price">
                ￥<strong>159</strong>
              </p>
            </div>
          </router-link> 
				</section>
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
         this.init()         
         this.top = 1
         this.bottom = 2
    },
    methods: {
      ...mapActions('goods', [ 'getGoodsPage' ]),
      init() {   
        //初始化载入列表      
        this.getGoodsPage({
          params:{
            currentPage:this.searchFilter.currentPage,
            pageSize:this.searchFilter.pageSize
          }
        }).then((res) => {
          this.listData = this.goodsList.list
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

