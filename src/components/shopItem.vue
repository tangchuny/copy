<template>
  <div class="shopItem"> 
    <div class="selectBuyShop">
      <div class="swiperBox">
        <mt-swipe :auto="4000">
          <mt-swipe-item><img src="../assets/images/banner2.jpg"></mt-swipe-item>
          <mt-swipe-item><img src="../assets/images/banner2.jpg"></mt-swipe-item>
          <mt-swipe-item><img src="../assets/images/banner2.jpg"></mt-swipe-item>
          <mt-swipe-item><img src="../assets/images/banner2.jpg"></mt-swipe-item>
          <mt-swipe-item><img src="../assets/images/banner2.jpg"></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="detailPrice">
        <div class="shopPrice"><span>￥658.00</span>起</div>
        <div class="buyShopName">
          <div class="shopItemName">1700KW交流电桩</div>
          <div class="shopItemNum">库存<span>800</span>件</div>
        </div>
      </div>
    </div>

    <div class="buyShopContent">
      <h3>1700KW交流电桩</h3>

      <ul class="shopListBox">
        <li>
          <div class="shopListImt"><img src="../assets/images/shopListImg.png"></div>
          <div class="shopListText">
            如果你无法简明的表达您的想法，那一定是您不够了解她。
          </div>
        </li>
        <li>
          <div class="shopListImt"><img src="../assets/images/shopListImg.png"></div>
          <div class="shopListText">
            如果你无法简明的表达您的想法，那一定是您不够了解她。
          </div>
        </li>
        <li>
          <div class="shopListImt"><img src="../assets/images/shopListImg.png"></div>
          <div class="shopListText">
            如果你无法简明的表达您的想法，那一定是您不够了解她。
          </div>
        </li>
      </ul>
    </div>

    <div class="shopBtn">
      <span><i></i>加入购物车</span>
      <span><i></i>立即购买</span>
    </div>
  </div>
</template>
