<template>
  <div>
    <div>Dashboard</div>
    <h1>Hello {{ email }}!!</h1>
    <button @click="signOut">Sign out</button>
    <div>
      <p>カード追加</p>
      <input type="text" placeholder="mondai" v-model="mondai">
      <input type="text" placeholder="kotae" v-model="kotae">
      <button @click="createCard">カードを追加</button>
    </div>
    <div>
      <p>登録しているカードを表示</p>
      <div
        v-for="(card, index) in cards"
        :key="`${card.mondai}-${index}`"
      >{{card.mondai}} - {{card.kotae}}</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "@/store/index.js";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      mondai: "",
      kotae: ""
    };
  },
  created() {
    // 初期化処理
    // TODO async fetchが動かなかった原因
    // https://qiita.com/kurosame/items/6ab7622fe30c299a693e
    this.fetchData();
  },
  computed: {
    cards() {
      return store.getters.getCards;
    },
    email() {
      return store.getters.getEmail;
    }
  },
  methods: {
    fetchData: function() {
      // 初期化処理
      console.log("**** fetch ****");
      // 現在のEmailを取得、空の場合はログインを促す
      const currentEmail = store.getters.getEmail;
      console.log(`****** currentEmail：${currentEmail} ******`);
      if (currentEmail) {
        // 対象ユーザのカードを取得
        store.dispatch("fetchCards");
      } else {
        // Emailが無いのでリダイレクト
        this.$router.push("/signin"); // '/signin'へリダイレクト
      }
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
      if (this.mondai != "" && this.kotae != "") {
        console.log(`${this.mondai} - ${this.kotae}`);
        const newCard = {
          mondai: this.mondai,
          kotae: this.kotae
        };

        store.dispatch("createCard", newCard);

        // 対象ユーザのカードを取得
        store.dispatch("fetchCards");

        this.mondai = "";
        this.kotae = "";
      }
    }
  }
};
</script>

<style>
</style>
