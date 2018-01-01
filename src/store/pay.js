import Vuex from 'vuex'
import axios from 'axios'
import { request } from '../api/httpconfig'
import qs from 'qs'
const pay = {
    state: {
        prepay: {},
    },
    actions: {
        getPrePay({ state, dispatch, commit }, params) {       
            return axios.get(baseUrl +'/shopweixin/prepay', params).then(function (res) {
                commit('_getPrePay', res.data)
            })
        },
    },
    mutations: {
        _getPrePay(state, res){
            state.prepay = res;
        },
        
    },
}
export default {
	namespaced: true,
	...pay
}
