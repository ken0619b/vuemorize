<template>
  <div>
    <div>Dashboard</div>
    <h1>Hello {{ name }}!!</h1>
    <button @click="signOut">Sign out</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Dashboard",
  data() {
    return {
      name: firebase.auth().currentUser.email
    };
  },
  methods: {
    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        });
    }
  }
};
</script>

<style>
</style>
