<template>
  <div class="container view-profile">
      <div class="card" v-if="profile">
          <h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
          <form @submit.prevent="addComment">
              <div class="field">
                  <label for="comment">Add a comment</label>
                  <input type="text" name="comment" v-model="newComment">
                  <p v-if="feedback" class="red-text center">{{ feedback }}</p>
              </div>
          </form>
          <ul class="comments collection">
              <li v-for="(comment,index) in comments" :key="index">
                  <div class="deep-purple-text">{{ comment.from }}</div>
                  <div class="grey-text text-darken-2">{{ comment.content }}</div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import db from '@/firebase/init'
export default {
    name: 'ViewProfile',
    props: ['user'],
    data() {
        return {
            profile: null,
            feedback: '',
            newComment: '',
            comments: []
        }
    },
    created() {
        db.collection('users').doc(this.$route.params.id).get()
            .then(user => {
                this.profile = user.data()
            })
        db.collection('users').doc(this.$route.params.id).collection('comments').orderBy('time')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        this.comments.unshift({
                            from: change.doc.data().from,
                            content: change.doc.data().content
                        })
                    }
                })
            })
    },
    methods: {
        addComment() {
            if(this.newComment) {
                this.feedback = null;
                db.collection('users').doc(this.$route.params.id).collection('comments').add({
                    from: this.user.id,
                    content: this.newComment,
                    time: Date.now()
                }).then(() => this.newComment = '')
            } else {
                this.feedback = 'You must enter a comment to add it'
            }
        }
    }
}
</script>

<style>
.view-profile .card{
  padding: 20px;
  margin-top: 60px;
}
.view-profile h2{
  font-size: 2em;
  margin-top: 0;
}
.view-profile li{
  padding: 10px;
  border-bottom: 1px solid #eee
}
</style>