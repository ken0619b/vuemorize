// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyCj1DihqxjnC5zCq_kr7zhl9Ze8o3z4P7g",
  authDomain: "vuemorize.firebaseapp.com",
  databaseURL: "https://vuemorize.firebaseio.com",
  projectId: "vuemorize",
  storageBucket: "vuemorize.appspot.com",
  messagingSenderId: "568967384037"
};

firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
