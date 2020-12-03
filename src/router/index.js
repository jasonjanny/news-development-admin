import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import PostList from '../views/PostList.vue'
import ReleasePost from '../views/ReleasePost.vue'

Vue.use(VueRouter)

// 解决element-ui点击同一个路由报错：NavigationDuplicated
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

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
