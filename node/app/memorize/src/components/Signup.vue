<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>SignUp Form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Email"
                    type="text"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="signUp">Sign Up</v-btn>
                  </v-card-actions>
                </v-form>
                <p>Do you have an account?
                  <router-link to="/signin">sign in now!!</router-link>
                </p>
                <v-alert
                  v-if="errorMessage != ''"
                  :value="true"
                  color="error"
                  icon="warning"
                  outline
                >{{ errorMessage }}</v-alert>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import store from "@/store/index.js";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    signUp: function() {
      let self = this;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          //alert("Create account: ", user.email);
        })
        .catch(error => {
          //alert(error.message);
        });

      // Stateへメールアドレスを登録する
      store.dispatch("setEmail", this.username);

      // Firebaseへ新規登録する
      const newUserData = {
        email: this.username,
        cards: []
      };
      const usersRef = firebase.database().ref("data");
      const currentUsername = this.username;

      //既存のユーザ情報が格納される、もしくは初期化
      usersRef.once("value").then(function(snapshot) {
        // console.log(`3 ${snapshot.child("users").val()}`);
        let currentUserData = snapshot.child("users").val();

        if (currentUserData instanceof Array) {
          // 初期済の場合
          console.log("update data");
          //console.log(`this.username: ${currentUsername}`); //TODO this参照できない
          // 既に登録済のメールアドレスかチェックする
          const filtered = currentUserData.filter(
            user => user.email === currentUsername
          );
          console.log(filtered);
          if (filtered.length > 0) {
            console.log("this email has been taked already");
            const correctUserData = currentUserData.filter(
              user => user.email === currentUsername
            );

            // エラーメッセージをセット
            self.errorMessage = "既に使用されているメールアドレスです。";
          } else {
            // 新規登録処理
            currentUserData.push(newUserData); //add new user to current data
            usersRef.update({
              users: currentUserData
            });

            // emailの初期化
            store.dispatch("setEmail", newUserData.email);

            // 初期化が終わったのでリダイレクト
            self.$router.push("/dashboard"); // '/dashboard'へリダイレクト
          }
        } else {
          // 初期化が必要な場合
          console.log("need initializing");
          // initialize
          usersRef.set({
            users: [newUserData]
          });

          // TODO
          // 以下の情報は、Dashboardで初期設定する

          // Cardsの初期化
          // store.dispatch("setCards", []);

          // emailの初期化
          store.dispatch("setEmail", newUserData.email);

          // 初期化が終わったのでリダイレクト
          self.$router.push("/dashboard"); // '/dashboard'へリダイレクト
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>