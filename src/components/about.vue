<template>
  <div class="about">
    <div class="mbHead">
      
    </div>
    <div class="purchase">
      <div class="purchaseHead">
        <div class="purchaseAll">
          <span></span>
          <h3>认购电桩</h3>
        </div>
        <div class="purchaseComplete">完成</div>
      </div>
      <ul class="purchaseShop">
        <li>
          <span class="shopBtn"></span>
          <p class="shopPic"><img src="../assets/images/shop.png"></p>
          <div class="shopDescribe">
            <div class="shopNum">
              <span class="minusBtn"><i></i></span>
              <span class="commodityNum">1</span>
              <span class="plusBtn"><i></i></span>
            </div>
            <p>新款1700KW</p>
            <p>￥658.00</p>
          </div>
          <div class="shopDelete">删除</div>
        </li>
        <li>
          <span class="shopBtn"></span>
          <p class="shopPic"><img src="../assets/images/shop.png"></p>
          <div class="shopDescribe">
            <div class="shopNum">
              <span class="minusBtn"><i></i></span>
              <span class="commodityNum">1</span>
              <span class="plusBtn"><i></i></span>
            </div>
            <p>新款1700KW</p>
            <p>￥658.00</p>
          </div>
          <div class="shopDelete">删除</div>
        </li>
      </ul>
    </div>
    
    <div class="purchase2">
      <div class="purchaseHead">
          <span></span>
          <h3>认购电桩</h3>
      </div>
      <ul class="purchaseShop">
        <li>
          <span class="shopBtn"></span>
          <p class="shopPic"><img src="../assets/images/shop.png"></p>
          <div class="shopDescribe">
            <div class="shopNum">
              <span class="minusBtn"><i></i></span>
              <span class="commodityNum">1</span>
              <span class="plusBtn"><i></i></span>
            </div>
            <p>新款1700KW</p>
            <p>￥658.00</p>
          </div>
          <div class="shopDelete">删除</div>
        </li>
      </ul>
    </div>
    <div class="shopBtnSelect">
      <div class="purchaseAll">
          <span></span>
         <span>全选</span>
      </div>
      <div class="shopBtnSelectDelete">删除</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      test1: '改变前'
    }
  },
  beforeCreate () {
    console.log(1)
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next((vm) => {
      vm.test = '改变了'
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>

<style>
</style>
