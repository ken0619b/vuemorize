<template>
  <div>
    <div>Dashboard</div>
    <h1>Hello {{ name }}!!</h1>
    <button @click="signOut">Sign out</button>
    <div>
      <p>ここに登録しているカードを表示</p>
      <button @click="createCard">ボタン</button>
    </div>
    <div>カード追加ボタンを表示</div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "@/store/index.js";

export default {
  name: "Dashboard",
  data() {
    return {
      name: firebase.auth().currentUser.email
    };
  },
  methods: {
    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        });
    },
    createCard: function() {
      console.log("createCard");
      console.log(store.state.count); // -> 0
      store.commit("increment"); //mutation commitで呼び出す
    }
  }
};
</script>

<style>
</style>
