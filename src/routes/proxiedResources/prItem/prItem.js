import Vue from 'vue'
import VueCo from 'vue-co'
import template from './prItem.html'
import * as proxiedResourcesModel from '../../../models/proxiedResources'
import UriTarget from './uriTarget'

import joi from 'joi'
import joiValidate from '../../../utils/joiValidate'

const paramsSchema = {
  project: joi.string().lowercase().token().max(64),
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}

export default VueCo({
  template,
  data: () => ({
    ready: false,
    view: 'formatted',
    resource: []
  }),
  route: {
    activate () {
      this.onActivate()
    }
  },
  methods: {
    onActivate: function * () {
      const params = joiValidate(this.$route.params, paramsSchema)
      const project = params.project
      const id = params.id
      const item = yield proxiedResourcesModel.get(project, id)
      this.resource = item
      Vue.nextTick(() => { this.ready = true })
    }
  },
  components: {
    UriTarget
  }
})
