import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'

import * as firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      props: true
    },
  ]
})
router.beforeEach((to, from, next) => {
  // check of see if the route has route guard
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    // Check whether user is authenticated
    const user = firebase.auth().currentUser;
    if(user) {
      // User is authenticated. Proceed to route
      next()
    } else {
      // No user is singed in. Redirect to Login
      next({name: 'Login'})
    }
  }
  // If the route is not guraded by gurad then proceed 
  else {
    next()
  }
})
export default router;