<template>
  <div class="navbar">
      <nav class="deep-purple darken-1">
          <div class="container-fluid">
              <a href="" class="brand-logo left"><router-link :to="{name: 'GMap'}">Geo Ninjas</router-link></a>
              <ul class="right">
                  <li v-if="!user"><router-link :to="{name: 'Signup'}">Signup</router-link></li>
                  <li v-if="!user"><router-link :to="{name: 'Login'}">Login</router-link></li>
                  <li v-if="user"><a>{{ user.email }}</a></li>
                  <li v-if="user"><a @click="logout">Logout</a></li>
              </ul>
          </div>
      </nav>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'; 
export default {
    name: 'navbar',
    data() {
        return {
            user: null,
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.user = user;
            } else {
                this.user = null;
            }
        })
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push({name: 'Login'})
            })
        }
    }
}
</script>

<style>

</style>