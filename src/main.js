import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import axios from 'axios'

// 绑定到原型
Vue.prototype.$axios = axios;

// 引入 ui 库
import ElementUI from 'element-ui';
// 引入 css
import 'element-ui/lib/theme-chalk/index.css';
//注册组件库
Vue.use(ElementUI);

//设置默认的 api 域名基准路径
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = 'http://liangwei.tech:3000'

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next();
  }
  if (localStorage.getItem('token')) {
    return next();
  } else {
    return router.push('/login');
  }
})

// 请求拦截器
axios.interceptors.request.use(config => {
  // Do something before request is sent
  // 判断请求头是否有token，如果头部没有带上token而本地又存在token
  if (!config.headers.Authorization && localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token');
  }
  return config;
});

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
