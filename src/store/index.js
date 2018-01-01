import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import order from '@/store/order'
import goods from '@/store/goods'
import pay from '@/store/pay'
const store = new Vuex.Store({
    modules: {
        order,
        goods,
        pay,
    }
});

export default store