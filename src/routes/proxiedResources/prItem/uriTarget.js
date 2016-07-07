import Vue from 'vue'
import template from './uriTarget.html'

export default Vue.extend({
  template,
  props: {
    uri: String,
    target: String
  },
  computed: {
    prefix () {
      return this.uri.replace(this.target, '').replace(/^https?:\/\//, '')
    }
  }
})
