import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

//import axios from 'axios' //追記
//import VueAxios from 'vue-axios' //追記

Vue.config.productionTip = false

//Vue.use(VueAxios, axios) //追記

Vue.use(ElementUI,{locale})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
