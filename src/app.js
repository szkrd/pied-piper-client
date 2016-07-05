import 'bootstrap'
import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteConfig from './routes/config/config'
import RouteHome from './routes/home/home'
import RouteProxiedResources from './routes/proxiedResources/proxiedResources'
import RouteProxiedResourceList from './routes/proxiedResources/prList'
import RouteProxiedResourceItem from './routes/proxiedResources/prItem'

import './app.less'
import template from './app.html'

Vue.use(VueRouter)

document.body.setAttribute('id', 'app')
const router = new VueRouter({
  linkActiveClass: 'active'
})

router.map({
  '/': {
    component: RouteHome
  },
  '/config': {
    component: RouteConfig
  },
  '/proxied-resources': {
    component: RouteProxiedResources,
    subRoutes: {
      '/:project': {
        component: RouteProxiedResourceList
      }
    }
  },
  '/proxied-resource/:project/:id': {
    name: 'resource',
    component: RouteProxiedResourceItem
  }
})

const App = Vue.extend({ template, replace: false })

router.start(App, '#app')
