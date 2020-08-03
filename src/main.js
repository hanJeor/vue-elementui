import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/global.css";
import "./assets/fonts/iconfont.css";
import VueParticles from 'vue-particles'
import "font-awesome/scss/font-awesome.scss"
import '@/style/index.scss'
require('../mock)
// 配置cookie
// import cookies from 'vue-cookies'


// Vue.prototype.cookie = cookies;  //配置时候prototype.$这里的名字自己定义不是固定是cookies
// import VuePrism from 'vue-prism'
Vue.use(VueParticles)

Vue.config.devtools = process.env.NODE_ENV === 'development'//点亮浏览器的Vue DevTools图标
Vue.config.productionTip = false

Vue.use(ElementUI);





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
