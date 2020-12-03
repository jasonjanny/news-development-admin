import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import PostList from '../views/PostList.vue'
import ReleasePost from '../views/ReleasePost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'postlist',
        component: PostList
      },
      {
        path: 'releasepost',
        component: ReleasePost
      }
    ]
  },

  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
