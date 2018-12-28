<template>
  <v-app id="inspire">
    <!-- nav -->
    <v-navigation-drawer v-model="drawer" v-if="device == 'sp'" fixed right app>
      <v-list dense>
        <v-subheader inset>{{ email }}</v-subheader>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>toggle_off</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="signOut">SignOut</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- content -->
    <v-content>
      <!-- header -->
      <v-toolbar color="indigo" dark fixed app>
        <v-spacer></v-spacer>
        <v-toolbar-title>Vuemorize</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon v-if="device == 'sp'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>{{ email }}</v-btn>
          <v-btn flat @click="signOut">Sign Out</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- main -->
      <div>
        <div v-if="device == 'sp'">
          <p>CardDeckコンポーネントから</p>
          <CardDeck v-bind:cardData="cards"/>
          <p>CardDeckコンポーネントから ここまで</p>
        </div>
        <div v-if="device == 'pc'">
          <CardAppend v-bind:cardData="cards"/>
        </div>
      </div>
    </v-content>

    <!-- footer -->
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; @kenkenken {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
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
      device: "",
      drawer: null,
      headers: [
        {
          text: "Words",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Translations", value: "translations" }
      ]
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
