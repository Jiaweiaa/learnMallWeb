// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import './assets/css/base.css';
import './assets/css/checkout.css';
import './assets/css/login.css';
import './assets/css/product.css';

import infiniteScroll from 'vue-infinite-scroll';

Vue.use(infiniteScroll);
Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    nickName: '',
    cardCount: 0
  },
  // 改变状态
  mutations: {
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state, cartCount) {
      state.cardCount += Number(cartCount);
    },
    initCartCount(state, cartCount) {
      state.cardCount = Number(cartCount);
    },
    loginOut(state, num) {
      state.cardCount = num;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
