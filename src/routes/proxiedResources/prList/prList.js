import qs from 'querystring'
import Vue from 'vue'
import VueCo from 'vue-co'
import template from './prList.html'
import * as proxiedResourcesModel from '../../../models/proxiedResources'
import * as projectsModel from '../../../models/projects'
import * as configModel from '../../../models/config'
import storage from '../../../models/persistentStorage'
import StatusCode from './statusCode'

import joi from 'joi'
import joiValidate from '../../../utils/joiValidate'

import innerTemplate from './prListInner.html'
import sortableIcon from './prListSortableIcon.html'

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
    loadingResources: false,
    ready: false,
    project: '',
    projects: [],
    resources: [],
    sortKey: '',
    sortDir: 1
  }),
  route: {
    activate () {
      this.onActivate()
    },
    data () {
      this.onData()
    }
  },
  methods: {
    onActivate: function * () {
      this.ready = false

      // get list of projects and info about their disabled status
      const { items, config } = yield {
        items: projectsModel.get(),
        config: configModel.get()
      }

      // assemble a list of projects with urls and disabled state
      this.projects = (items || []).map(name => ({
        name,
        url: `/proxied-resources/${name}`,
        disabled: config.disabledProjects.includes(name)
      }))

      // if we used to have a project name, redirect to that
      // this is the reliable way, since this.projects is fresh
      this.redirectToLastActiveProject(items)

      Vue.nextTick(() => { this.ready = true })
    },

    // on view reuse (query or param change)
    onData: function * () {
      this.params = joiValidate(this.$route.params, paramsSchema)
      this.query = joiValidate(this.$route.query, querySchema)
      if (!this.params.project) {
        return this.redirectToLastActiveProject()
      }

      this.sortKey = this.query.sortKey || this.sortKey
      this.sortDir = this.query.sortDir || this.sortDir

      // save the desired project name from the url param to persistent storage
      const project = this.params.project
      storage.activeProject = project

      this.project = project
      yield this.getAll()
    },

    // if we have a stored project name and that one still exists
    // redirect to there, unless we already have the project name in the url
    redirectToLastActiveProject (items) {
      if (this.params.project) {
        return
      }
      let activeProject = storage.activeProject
      // this way we may still end up in a dead/deleted project's view
      // but it's quite rare and it's not a really big deal
      if (items && items.includes(activeProject)) {
        activeProject = storage.activeProject = ''
      }
      if (activeProject) {
        this.$router.replace(`/proxied-resources/${activeProject}`)
      }
    },

    getAll: function * () {
      this.loadingResources = true
      const items = yield proxiedResourcesModel.getAll(this.project, this.query)
      this.loadingResources = false
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
      this.sortKey = sortKey
      let query = qs.stringify({ sortKey, sortDir: this.sortDir })
      this.$router.replace(`/proxied-resources/${this.project}?${query}`)
    }
  },
  partials: {
    innerTemplate,
    sortableIcon
  },
  components: {
    StatusCode
  }
})
