import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";

Vue.use(Vuex)

// ストアを作成
const store = new Vuex.Store({
  state: {
    email: '',
    users: [],
    cards: [
      {
        mondai: '11111',
        kotae: 'aaaa'
      },
      {
        mondai: '22222',
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
    setEmail (context, newEmail) {
      context.commit('setEmail', newEmail)
    },
    setCards (context, newCards) {
      context.commit('setCards', newCards)
    },
    setUsers (context, newUsers) {
      context.commit('setUsers', newUsers)
    },
    getUsers (context, email) {
      // Firebaseからユーザ情報を取得
      const usersRef = firebase.database().ref("data");
      usersRef.once("value").then(function(snapshot) {
        const currentUserData = snapshot.child("users").val();

        // usersを更新
        context.commit('setUsers', currentUserData)
      })
    },
    fetchCards (context) {
      console.log('fetchCards')
      // Firebaseからユーザ情報を取得
      const usersRef = firebase.database().ref("data");
      usersRef.once("value").then(function(snapshot) {
        const currentUserData = snapshot.child("users").val();

        // 対象のユーザ情報を取得
        const userInfo = currentUserData.filter(
          user => user.email == store.getters.getEmail
        );

        console.log(`userInfo[0].email:${userInfo[0].email}`)

        let currentCards;
        if(userInfo[0].cards instanceof Array){
          currentCards = userInfo[0].cards
        } else {
          currentCards = []
        }

        // cardsを更新
        context.commit('setCards', currentCards)
      })
    },
    createCard (context, newCard) {
      console.log('createCard has been called')
      // firebaseからユーザ情報を取得
      const usersRef = firebase.database().ref("data");

      // カード情報
      let currentCards;

      usersRef.once("value").then(function(snapshot) {
        const currentUserData = snapshot.child("users").val();

        // state.emailと等しい（ログインしている）ユーザのカードを取得
        const userInfo = currentUserData.filter(
          user => user.email == store.getters.getEmail
        );

        // state.emailと等しいユーザ情報のindexを取得
        const userIndex = currentUserData.findIndex(
          user => user.email == store.getters.getEmail
        );

        if(userInfo[0].cards === undefined){
          currentCards = [newCard]
          // 新規作成
          firebase.database()
            .ref(`data/users/${userIndex}`)
            .set({
              email: store.getters.getEmail,
              cards: currentCards
            });
          // cardsを更新
          context.commit('setCards', currentCards)

        } else {
          // 現在のカードを追加
          currentCards = userInfo[0].cards

          //カードデータを追加
          currentCards.push(newCard)

          // dbを更新
          firebase.database()
            .ref(`data/users/${userIndex}`)
            .set({
              email: store.getters.getEmail,
              cards: currentCards
            });

          // cardsを更新
          context.commit('setCards', currentCards)
        }
      })
    }
  }
})
export default store