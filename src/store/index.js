import Vue from 'vue';
import Vuex from 'vuex';
import dashboard from './dashboard';
Vue.use(Vuex)
let store = new Vuex.Store({
  modules: {
  	dashboard
  }
});

export default store