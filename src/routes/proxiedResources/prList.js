import Vue from 'vue'
import VueCo from 'vue-co'
import template from './prList.html'
import * as proxiedResourcesModel from '../../models/proxiedResources'
import storage from '../../models/persistentStorage'

import joi from 'joi'
import joiValidate from '../../utils/joiValidate'

const paramsSchema = {
  project: joi.string().lowercase().token().max(64)
}

export default VueCo({
  template,
  data: () => ({
    ready: false,
    project: '',
    resources: []
  }),
  route: {
    data () {
      this.onData()
    }
  },
  methods: {
    onData: function * () {
      const params = joiValidate(this.$route.params, paramsSchema)
      const project = params.project
      storage.activeProject = project
      this.project = project
      yield this.getAll()
      Vue.nextTick(() => { this.ready = true })
    },
    getAll: function * () {
      const items = yield proxiedResourcesModel.getAll(this.project)
      this.resources = items
    },
    toggleResource (resource) {
      proxiedResourcesModel.toggle(this.project, resource._id)
    },
    // TODO proper error handling, as usual
    deleteResource: function * (resource) {
      yield proxiedResourcesModel.remove(this.project, resource._id)
      this.resources.$remove(resource)
    },
    deleteAllResources: function * () {
      yield proxiedResourcesModel.removeAll(this.project)
      yield this.getAll()
    },
    // TODO move to view/link
    openResource (resource) {
      this.$router.go({ name: 'resource', params: {
        project: this.project,
        id: resource._id
      }})
    }
  }
})
