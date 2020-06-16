<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import db from "@/firebase/init.js";
export default {
  name: "GMap",
  data() {
    return {
      lat: 0,
      lng: 0,
      currentUserData: null
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        stretViewControl: false
      });
      db.collection('users').get()
      .then(users => {
        users.docs.forEach(user => {
          let data = user.data()
          if(data.geolocation) {
            let marker = new google.maps.Marker({
              position: {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng
              },
              map
            })
            marker.addListener('click',() => {
              this.$router.push({name: 'ViewProfile',params: {id: user.id, user: this.user}})
            })
          }
        })
      })
    }
  },
  mounted() {
    // Get Current Firebase User
    let user = firebase.auth().currentUser;

    // get Current Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;

          // find the user records and update the user records
          db.collection("users")
            .where("user_id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude
                    }
                  })
                  .then(() => {
                    this.user = {...doc.data(),id:doc.id};
                    this.renderMap()
                  });
              });
            });
        },
        err => {
          // Timeout Center by default
          this.renderMap();
        },
        { maximumAge: 6000, timeout: 3000 }
      ); //cached location
    } else {
      // Position center by default values
      this.renderMap();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
