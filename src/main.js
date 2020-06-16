// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase/app';

Vue.config.productionTip = false

let app = null;

/* Wait for firebase auth to init before creating app */
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})