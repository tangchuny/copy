import axios from 'axios'

const order = {
    state: {
        orderList: [],
        carList: null,
        rg_list: {},
        cg_list: {},
        get_order: {},
        cancelRes: {}
    },
    actions: {
        getCGlist({ state, dispatch, commit }, params) {
            return axios.get(baseUrl + '/shopindex/getPurGoodsPage', params).then(function (res) {
                commit('_cg', res.data.obj)
            })
        },
        getRGlist({ state, dispatch, commit }, params) {
            return axios.get(baseUrl + '/shopindex/getSubGoodsPage', params).then(function (res) {
                commit('_rg', res.data.obj)
            })
        },
        getOrder({ state, dispatch, commit }, params) {
            return axios.get(baseUrl + '/shoporder/list', params).then(function (res) {
                commit('_order', res.data.obj)
            })
        },
        getCarList({ state, dispatch, commit }, params) {
            return axios.get(baseUrl + '/shopcart/list', params).then(function (res) {
                commit('_carList', res.data.obj)
            })
        },
        //订单页面
        cancelOrder({ state, dispatch, commit }, params) {
            return axios.get(baseUrl + '/shoporder/cancel', params).then(function (res) {
                commit('_cancelOrder', res.data)
            })
        }

    },
    mutations: {
        _order(state, res) {
            state.orderList = res;
        },
        _carList(state, res) {
            state.carList = res;
        },
        _cg(state, res) {
            state.cg_list = res;
        },
        _rg(state, res) {
            state.rg_list = res;
        },
        setOrder(state, params) {
            state.get_order = params
        },

        _cancelOrder(state, res) {
            state.cancelRes = res
        }
    },
    getters: {
    }
}
export default {
    namespaced: true,
    ...order
}
