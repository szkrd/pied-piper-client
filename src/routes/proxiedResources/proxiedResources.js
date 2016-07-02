import Vue from 'vue'
import VueCo from 'vue-co'
import template from './proxiedResources.html'
import * as projectsModel from '../../models/projects'

export default VueCo({
  template,
  data: () => ({
    ready: false,
    projects: []
  }),
  route: {
    activate () {
      this.onActivate()
    }
  },
  methods: {
    onActivate: function * () {
      this.ready = false
      const items = yield projectsModel.get()
      this.projects = (items || []).map(name => ({
        name,
        url: `/proxied-resources/${name}`
      }))
      Vue.nextTick(() => { this.ready = true })
    }
  }
})
