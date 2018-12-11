<template>
  <div class="signin">
    <h2>Sign in</h2>
    <h1>{{ errorMessage }}</h1>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">Signin</button>
    <p>You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
  </div>
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signin {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>