import 'bootstrap'
import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteConfig from './routes/config/config'
import RouteHome from './routes/home/home'
import RouteProxiedResourceList from './routes/proxiedResources/prList/prList'
import RouteProxiedResourceEdit from './routes/proxiedResources/prEdit'
import RouteProxiedResourceView from './routes/proxiedResources/prItem/prItem'
import CodeMirrorDirective from './directives/codeMirror'
import HighlightJsDirective from './directives/highlightJs'
import JsonViewerDirective from './directives/jsonViewer'
import MomentFilter from './filters/moment'
import GlobalActiveSwitch from './components/globalActiveSwitch/globalActiveSwitch'

import './app.less'
import template from './app.html'

Vue.use(VueRouter)
Vue.directive('codemirror', CodeMirrorDirective)
Vue.directive('highlightjs', HighlightJsDirective)
Vue.directive('jsonviewer', JsonViewerDirective)
Vue.filter('moment', MomentFilter)

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
  // vue router has no :optional? matcher, only *, hence the fake outer wrapper for resources
  '/proxied-resources/': {
    name: 'resources-root',
    component: RouteProxiedResourceList
  },
  // this was a sub view before, but activate fired twice in certain cases
  '/proxied-resources/:project': {
    name: 'resources',
    component: RouteProxiedResourceList
  },
  // view single resource
  '/proxied-resource/:project/:id': {
    name: 'resource',
    component: RouteProxiedResourceView
  },
  // edit single resource
  '/proxied-resource/:project/:id/edit': {
    name: 'resource-edit',
    component: RouteProxiedResourceEdit
  }
})

const components = {
  GlobalActiveSwitch
}

const App = Vue.extend({ template, replace: false, components })

router.start(App, '#app')
