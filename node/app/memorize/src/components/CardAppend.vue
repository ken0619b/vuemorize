<template>
  <!-- cardAdd -->
  <v-flex xs12 sm8 offset-sm2>
    <v-form v-model="valid">
      <v-text-field v-model="mondai" label="単語" required></v-text-field>
      <v-text-field v-model="kotae" label="訳語" required></v-text-field>
      <v-layout justify-center>
        <v-btn flat large color="primary" @click="createCard">登録</v-btn>
      </v-layout>
    </v-form>

    <!-- cardList -->
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs2 v-for="(card, index) in cardData" :key="index">
            <v-card v-bind:color="pickColor()" class="white--text">
              <v-layout row>
                <v-flex>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{card.mondai}}</div>
                      <div>{{card.kotae}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import store from "@/store/index.js";
import ColorUtil from "@/utils/ColorUtil.js";

export default {
  data() {
    return {
      mondai: "",
      kotae: ""
    };
  },
  props: ["cardData"],
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
    },
    pickColor: function() {
      return ColorUtil.pickColor();
    }
  }
};
</script>

<style>
</style>
