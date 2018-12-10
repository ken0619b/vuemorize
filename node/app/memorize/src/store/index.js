import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";

Vue.use(Vuex)

// ストアを作成
const store = new Vuex.Store({
  state: {
    count: 0,
    email: '',
    users: [],
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
    },
    getUsers (state) {
      const usersRef = firebase.database().ref("data");

      usersRef.once("value").then(function(snapshot) {
        //console.log(`3 ${snapshot.child("users").val()}`);
        const currentUserData = snapshot.child("users").val();

        // usersを更新
        store.dispatch('setUsers', currentUserData)
      })
    },
    getCards (state) {
      return state.cards
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
    setUsers(state, newUsers) {
      state.users = newUsers
    }
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
    },
    setUsers (context, newUsers) {
      context.commit('setUsers', newUsers)
    },
    getUsers (context) {
      // Firebaseからユーザ情報を取得
      const usersRef = firebase.database().ref("data");
      usersRef.once("value").then(function(snapshot) {
        const currentUserData = snapshot.child("users").val();

        // usersを更新
        context.commit('setUsers', currentUserData)
      })
    },
    createData (context, newUserData) {
      // Signupから移植予定
    }
  }
})
export default store