<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
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
                    <v-btn color="primary" @click="signIn">Sign in</v-btn>
                  </v-card-actions>
                </v-form>
                <p>You don't have an account?
                  <router-link to="/signup">create account now!!</router-link>
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
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    signIn: function() {
      let self = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password) //v-modelで受け取ったプロパティ使って認証
        .then(
          user => {
            // Stateへメールアドレスを登録する
            store.dispatch("setEmail", this.username);

            this.$router.push("/dashboard"); // '/dashboard'へリダイレクト
          },
          err => {
            self.errorMessage = err.message;
          }
        );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>