import qs from 'qs'
import Vue from 'vue'
import VueCo from 'vue-co'
import template from './prList.html'
import * as proxiedResourcesModel from '../../../models/proxiedResources'
import storage from '../../../models/persistentStorage'
import StatusCode from './statusCode'

import joi from 'joi'
import joiValidate from '../../../utils/joiValidate'

const paramsSchema = {
  project: joi.string().lowercase().token().max(64)
}

const querySchema = {
  include: joi.array().items(joi.string().valid([
    '_id',
    'disabled',
    'sleep',
    'request.method',
    'request.target',
    'request.uri',
    'request.body',
    'request.headers',
    'response.body',
    'response.headers',
    'response.statusCode'
  ])),
  // sort
  sortKey: joi.string().valid(['request.method', 'request.target', 'request.uri', 'response.statusCode', 'sleep', 'lastModified', '_id']),
  sortDir: joi.number().integer().valid([1, -1]),
  // search
  method: joi.string().uppercase().valid(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  statusCode: joi.number().positive().integer(),
  uri: joi.string()
}

export default VueCo({
  template,
  data: () => ({
    ready: false,
    project: '',
    resources: [],
    sortDir: 1
  }),
  route: {
    data () {
      this.onData()
    }
  },
  methods: {
    // TODO FIXME this is called twice because of the parent view
    onData: function * () {
      const params = joiValidate(this.$route.params, paramsSchema)
      this.query = joiValidate(this.$route.query, querySchema)
      const project = params.project
      storage.activeProject = project
      this.project = project
      yield this.getAll()
      Vue.nextTick(() => { this.ready = true })
    },
    getAll: function * () {
      const items = yield proxiedResourcesModel.getAll(this.project, this.query)
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
    sort (sortKey) {
      if (sortKey === this.query.sortKey) {
        this.sortDir = this.sortDir * -1
      }
      let query = qs.stringify({ sortKey, sortDir: this.sortDir })
      this.$router.replace(`/proxied-resources/${this.project}?${query}`)
    }
  },
  components: {
    StatusCode
  }
})
