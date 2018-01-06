import Vuex from 'vuex'
import axios from 'axios'
import { request } from '../api/httpconfig'
import qs from 'qs'
const pay = {
    state: {
        prepay: {},
        openId:'',
    },
    actions: {
        getPrePay({ state, dispatch, commit }, params) {       
            return axios.get(baseUrl +'/shopweixin/prepay', params).then(function (res) {
                commit('_getPrePay', res.data)
            })
        },
        getOpenId({ state, dispatch, commit }) {
            localStorage.setItem('openId', 'oiaeIwtc5Gedl6t9v6oQi7Y6m99c')  
            // return axios.get(baseUrl +'/shopsys/login').then(function (res) {
            //     localStorage.setItem('openId', res.data.openId)
            //     commit('_getOpenId', res.data.openId)
            // })
        },
    },
    mutations: {
        _getPrePay(state, res){
            state.prepay = res;
        },
        
        _getOpenId(state, res){
            state.openId = res;
        },
        
    },
}
export default {
	namespaced: true,
	...pay
}
