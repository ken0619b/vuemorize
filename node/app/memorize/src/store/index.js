import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// ストアを作成
const store = new Vuex.Store({
  state: {
    count: 0,
    email: '',
    cards: [
      {
        modai: '11111',
        kotae: 'aaaa'
      },
      {
        modai: '22222',
        kotae: 'bbbb'
      },
      
    ]
  },

  getters: {
    getEmail (state) {
      return state.email
    }
  },

  mutations: {
    // カウントアップするミューテーションを登録
    increment(state) {
      state.count++
    },
    setEmail(state, newEmail) {
      state.email = newEmail
    },
    setCards(state, newCards) {
      state.cards = newCards
    },
  },

  actions: {
    increment (context) {
      context.commit('increment')
    },
    setEmail (context, newEmail) {
      context.commit('setEmail', newEmail)
    },
    setCards (context, newCards) {
      context.commit('setCards', newCards)
    }
  }
})
export default store