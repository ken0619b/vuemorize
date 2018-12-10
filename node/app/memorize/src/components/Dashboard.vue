<template>
  <div>
    <div>Dashboard</div>
    <h1>Hello {{ email }}!!</h1>
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
  created() {
    // 初期化処理
    // TODO async fetchが動かなかった原因
    // https://qiita.com/kurosame/items/6ab7622fe30c299a693e
    this.fetchData();
  },
  data() {
    return {
      email: ""
      // email: firebase.auth().currentUser.email
    };
  },
  methods: {
    fetchData: function() {
      // 初期化処理
      console.log("**** fetch ****");
      // 現在のEmailを取得、空の場合はログインを促す
      const currentEmail = store.getters.getEmail;
      console.log(`****** currentEmail：${currentEmail} ******`);
      if (currentEmail) {
        // 値がセットされているので対象のデータを抽出
      } else {
        // Emailが無いのでリダイレクト
        this.$router.push("/signin"); // '/signin'へリダイレクト
      }
      // 取得したemailをセット
      this.email = store.getters.getEmail;
    },
    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        });

      // emailの初期化
      store.dispatch("setEmail", "");
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
