import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'
import full from './fullDeck.js'

let data = {
  products: mock,
  deck: full,
  cart: [],
  hand: [],
  dealer: [],
  value: '',
  dealerValue:'',
  addedCard: ''
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')