<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias</label>
        <input type="text" id="alias" v-model="alias" />
      </div>
      <div v-if="feedback" class="red-text center">{{ feedback }}</div>
      <div class="center field">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init"
import slugify from "slugify"
import * as firebase from "firebase/app"
export default {
  name: "Signup",
  data() {
    return {
      alias: "",
      email: "",
      password: "",
      feedback: "",
      slug: "",
      user: null
    }
  },
  methods: {
    signup() {
      if (this.email && this.alias && this.password) {
        this.feedback = null
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection("users").doc(this.slug)
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This alias is already exists"
          } else {
            // This alias does not exist in db
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((cred) => {               
                  this.user = cred.user
              })
              .catch(err => {
                console.log(err)
                this.feedback = err.message
              })
          }
        })
      } else {
        this.feedback = "Please fill in all the details"
      }
    }
  },
  mounted() {
      firebase.auth().onAuthStateChanged(user => {
          if(this.user){
            db.collection("users").doc(this.slug).set({
                        alias: this.alias,
                        geolocation: null,
                        user_id: user.uid
                })
                .then(() => this.$router.push({name: 'GMap'}))
                .catch(err => this.feedback = err.message)
          }
      })
  }
}
</script>

<style>
div.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>