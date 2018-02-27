import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import categories from '@app/categories/store'
import products from '@app/products/store'

Vue.use(Vuex)

const modules = {
  categories,
  products
}

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: null
  },
  actions: {
    setToken ({ commit }, obj) {
      commit('SET_TOKEN', obj)
    },
    removeToken ({ commit }) {
      commit('REMOVE_TOKEN')
    }
  },
  mutations: {
    SET_TOKEN (state, obj) {
      state.token = obj.token
    },
    REMOVE_TOKEN (state) {
      state.token = null
    }
  },
  getters: {
    email (state) {
      const { token } = state
      if (token != null) {
        const decoded = decode(token)
        return decoded.email
      }
      return ''
    }
  }
})
