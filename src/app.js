import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTest from './components/vueTest/vueTest'

import './app.less'
import template from './app.html'

Vue.use(VueRouter)

document.body.setAttribute('id', 'app')
const router = new VueRouter()

router.map({
  '/vue-test/:message': {
    component: VueTest
  }
})

const App = Vue.extend({
  template,
  data: () => ({
    message: 'Hello Vue.js!'
  }),
  components: {
    VueTest
  },
  replace: false
})

router.start(App, '#app')
