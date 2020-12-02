import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import vmodal from 'vue-js-modal';
import Toasted from 'vue-toasted';

import {
  Button,
  Card,
  Table,
  Icon,
  Space,
  Select,
  Tag,
  Badge
} from 'ant-design-vue';

[
  vmodal,
  Toasted,
  Button,
  Card,
  Table,
  Icon,
  Space,
  Select,
  Tag,
  Badge
].forEach(plugin => { Vue.use(plugin) })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
