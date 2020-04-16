import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8081/pryshirt/'
// axios.defaults.withCredentials = true
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        auth: false,
        orders: ''

    },
    mutations: {
        setUser (state, user) {
            state.user = user
            state.auth = Boolean(user)
        },
        setOrders (state, orders) {
            state.orders = orders
        }
    },
    actions: {
        async logout({ commit }) {
            commit('setUser', null)
        },
        async login({ commit }, credentials) {
            var data = ''
            await axios.post('user/checkLogin', credentials)
            .then( response => {
                data = response.data
                commit('setUser', response.data)
            })
            return new Promise((resolve) => {
                resolve(data)
            })
        },
        async register({ commit }, credentials) {
            var data = ''
            await axios.post('user', credentials)
            .then( response => {
                data = response.data
                commit('setUser', response.data)
            })
            .catch( e=> console.log(e))
            return new Promise((resolve) => {
                resolve(data)
            })
        },
        async getOrders({ commit }, userId) {
            var data = ''
            await axios.get('order/getByUserId/' + userId)
            .then( response => {
                data = response.data
                commit('setOrders', response.data)
            })
            .catch( e=> console.log(e))
            return new Promise((resolve) => {
                resolve(data)
            })
        }
    }
})