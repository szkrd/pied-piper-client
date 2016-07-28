import _ from 'lodash'
import Vue from 'vue'
import VueCo from 'vue-co'
import template from './prEdit.html'
import * as proxiedResourcesModel from '../../models/proxiedResources'

import joi from 'joi'
import joiValidate from '../../utils/joiValidate'

const paramsSchema = {
  project: joi.string().lowercase().token().max(64),
  id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}

export default VueCo({
  template,
  data: () => ({
    ready: false,
    project: '',
    id: '',
    resource: {},
    resourceRequestJson: '',
    resourceResponseJson: '',
    resourceRequestJsonValid: false,
    resourceResponseJsonValid: false
  }),
  route: {
    activate () {
      this.onActivate()
    }
  },
  watch: {
    resourceRequestJson () {
      this._validateResourceRequestJson()
    },
    resourceResponseJson () {
      this._validateResourceResponseJson()
    }
  },
  created () {
    this._validateResourceRequestJson = _.debounce(this.validateResourceRequestJson, 1000)
    this._validateResourceResponseJson = _.debounce(this.validateResourceResponseJson, 1000)
  },
  methods: {
    onActivate: function * () {
      const params = joiValidate(this.$route.params, paramsSchema)
      const project = this.project = params.project
      const id = this.id = params.id
      const item = yield proxiedResourcesModel.get(project, id)
      this.resource = _.defaults(item, { disabled: false, sleep: 0 })
      this.resourceRequestJson = JSON.stringify(item.request, null, '  ')
      this.resourceResponseJson = JSON.stringify(item.response, null, '  ')
      Vue.nextTick(() => { this.ready = true })
    },
    validateResourceRequestJson () {
      try {
        JSON.parse(this.resourceRequestJson)
        this.resourceRequestJsonValid = true
      } catch (err) {
        this.resourceRequestJsonValid = false
      }
    },
    validateResourceResponseJson () {
      try {
        JSON.parse(this.resourceResponseJson)
        this.resourceResponseJsonValid = true
      } catch (err) {
        this.resourceResponseJsonValid = false
      }
    },
    resourceRequestEditorBlur () {
      this.validateResourceRequestJson()
    },
    resourceResponseEditorBlur () {
      this.validateResourceResponseJson()
    },
    submit: function * (e) {
      e.preventDefault()
      const resource = {
        disabled: this.resource.disabled,
        sleep: this.resource.sleep,
        request: JSON.parse(this.resourceRequestJson),
        response: JSON.parse(this.resourceResponseJson)
      }
      // TODO redirect, error handling
      yield proxiedResourcesModel.set(this.project, this.id, resource)
    }
  }
})
