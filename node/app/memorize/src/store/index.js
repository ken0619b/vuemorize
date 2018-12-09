import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// ストアを作成
const store = new Vuex.Store({
  state: {
    count: 0,
    user: {
      email: ''
    }
  },
  mutations: {
    // カウントアップするミューテーションを登録
    increment(state) {
      state.count++
    },
    setEmail(state, newEmail){
      state.email = newEmail
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    setEmail (context, newEmail) {
      context.commit('setEmail', newEmail)
    }
  }
})
export default store