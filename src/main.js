import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入公共的css文件
import '@/assets/css/common.css'
// 淘宝无线适配文件
import '@/assets/js/flexible'
// 引入图标样式
import '@/assets/font/iconfont.css'

// 使用ly-tab插件
import LyTab from 'ly-tab'
Vue.use(LyTab)

// 全局引入mimt-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入Vant UI
import { Form, Field, Button, Uploader, Checkbox, CheckboxGroup, Stepper, AddressEdit, CountDown, Sku } from 'vant';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Uploader);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Stepper);
Vue.use(AddressEdit);
Vue.use(CountDown);
Vue.use(Sku);


Vue.config.productionTip = false;

// 事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
