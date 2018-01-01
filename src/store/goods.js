import Vuex from 'vuex'
import axios from 'axios'
import { request } from '../api/httpconfig'
import qs from 'qs'
const goods = {
    state: {
        goodsList: [],
        order:{}
    },
    actions: {
        getGoodsPage({ state, dispatch, commit }, params) {  
            let url = params.types == '1'? '/shopindex/getPurGoodsPage' : '/shopindex/getSubGoodsPage'     
            return axios.get(baseUrl +url, params).then(function (res) {
                commit('_goodsPage', res.data.obj.page)
            })
        },
        postOrder({ state, dispatch, commit }, params) {     
            let datas = qs.stringify( params )
            /* return request({method:'POST', url: baseUrl+'/shoporder/add', datas}).then((res)=>{
                debugger
                commit('_postOrder', res.data.obj.page)
            }) */
            return axios.post(baseUrl+'/shoporder/add', datas).then(function (res) {
                commit('_postOrder', res.data.obj.page)
            })
        },
    },
    mutations: {
        _goodsPage(state, res){
            state.goodsList = res;
        },
        _postOrder(state, res){
            state.postorder = res
        }
    },
}
export default {
	namespaced: true,
	...goods
}
