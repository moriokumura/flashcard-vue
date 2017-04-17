import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedIn: false
  },
  getters: {
    getAccessToken: state => localStorage.getItem('accessToken')
  },
  mutations: {
    logIn (state, newToken) {
      state.loggedIn = true
      localStorage.setItem('accessToken', newToken)
    },
    logOut (state) {
      state.loggedIn = false
      localStorage.removeItem('accessToken')
    }
  }
})
