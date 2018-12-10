<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signUp">Register</button>
    <p>Do you have an account?
      <router-link to="/signin">sign in now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "@/store/index.js";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
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
      let processIsCorrect = true;

      //既存のユーザ情報が格納される、もしくは初期化
      usersRef.once("value").then(function(snapshot) {
        //console.log(`1 snapshot:${snapshot}`);
        //console.log(`2 typeof: ${typeof snapshot.val()}`);
        console.log(`3 ${snapshot.child("users").val()}`);
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

            //console.log(correctUserData);
            //processIsCorrect = undefined;

            // Cardsの初期化(既存のユーザで)
            store.dispatch("setCards", correctUserData[0].cards);

            // emailの初期化（既存のユーザで）
            store.dispatch("setEmail", correctUserData[0].email);
          } else {
            // 新規登録処理
            currentUserData.push(newUserData); //add new user to current data
            usersRef.update({
              users: currentUserData
            });
          }
        } else {
          // 初期化が必要な場合
          console.log("need initializing");
          // initialize
          usersRef.set({
            users: [newUserData]
          });

          // Cardsの初期化
          store.dispatch("setCards", []);

          // emailの初期化
          store.dispatch("setEmail", newUserData.email);
        }
      });

      // emailがtakenの場合でも遷移してしまう。
      if (processIsCorrect == true) {
        // 初期化が終わったのでリダイレクト
        this.$router.push("/dashboard"); // '/dashboard'へリダイレクト
      }
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
.signup {
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