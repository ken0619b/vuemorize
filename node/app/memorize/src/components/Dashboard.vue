<template>
  <div>
    <div>Dashboard</div>
    <h1>Hello {{ email }}!!</h1>
    <button @click="signOut">Sign out</button>
    <p>登録しているカードを表示</p>
    <div
      v-for="(card, index) in cards"
      :key="`${card.mondai}-${index}`"
    >{{card.mondai}} - {{card.kotae}}</div>
    <div>
      <div v-if="device == 'sp'">
        <p>CardDeckコンポーネントから</p>
        <CardDeck v-bind:cardData="cards"/>
      </div>
      <div v-if="device == 'pc'">
        <p>CardAppendコンポーネントから</p>
        <CardAppend/>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "@/store/index.js";
import { mapGetters } from "vuex";

import isMobile from "@/utils/DeviceUtil.js";
import CardDeck from "@/components/CardDeck";
import CardAppend from "@/components/CardAppend";

export default {
  components: {
    CardDeck,
    CardAppend
  },
  name: "Dashboard",
  data() {
    return {
      device: ""
    };
  },
  created() {
    // 初期化処理
    // TODO async fetchが動かなかった原因
    // https://qiita.com/kurosame/items/6ab7622fe30c299a693e
    this.fetchData();

    // // デバイス判定
    if (isMobile.isMobile() || isMobile.isTablet()) {
      this.device = "sp";
    } else {
      this.device = "pc";
    }
  },
  computed: {
    cards: function() {
      return store.getters.getCards;
    },
    email: function() {
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
    }
  }
};
</script>

<style>
</style>
