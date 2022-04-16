import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from './modules/user.js'
import cart from './modules/cart.js'
import address from './modules/address.js'
import order from './modules/order.js'

export default new Vuex.Store({
  modules: {
    user,
    cart,
    address,
    order
  }
});
