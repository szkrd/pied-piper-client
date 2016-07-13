import 'bootstrap'
import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteConfig from './routes/config/config'
import RouteHome from './routes/home/home'
import RouteProxiedResources from './routes/proxiedResources/proxiedResources'
import RouteProxiedResourceList from './routes/proxiedResources/prList'
import RouteProxiedResourceEdit from './routes/proxiedResources/prEdit'
import RouteProxiedResourceView from './routes/proxiedResources/prItem/prItem'
import HighlightJsDirective from './directives/highlightJs'
import JsonViewerDirective from './directives/jsonViewer'

import './app.less'
import template from './app.html'

Vue.use(VueRouter)
Vue.directive('highlightjs', HighlightJsDirective)
Vue.directive('jsonviewer', JsonViewerDirective)

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
    component: RouteProxiedResourceView
  },
  '/proxied-resource/:project/:id/edit': {
    name: 'resource-edit',
    component: RouteProxiedResourceEdit
  }
})

const App = Vue.extend({ template, replace: false })

router.start(App, '#app')
