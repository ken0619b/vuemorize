<template>
  <div>
    <p>カード追加</p>
    <input type="text" placeholder="mondai" v-model="mondai">
    <input type="text" placeholder="kotae" v-model="kotae">
    <button @click="createCard">カードを追加</button>
  </div>
</template>

<script>
import store from "@/store/index.js";
export default {
  data() {
    return {
      mondai: "",
      kotae: ""
    };
  },
  methods: {
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

        // 初期化
        this.mondai = "";
        this.kotae = "";
      }
    }
  }
};
</script>

<style>
</style>
