import Vue from 'vue';
import Vuex from 'vuex';
import dashboard from './dashboard';
import tagsView from './tagsView';
Vue.use(Vuex)
let store = new Vuex.Store({
  modules: {
  	dashboard,tagsView
  }
});

export default store