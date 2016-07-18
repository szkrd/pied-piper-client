import Vue from 'vue'
import template from './statusCode.html'

export default Vue.extend({
  template,
  props: {
    value: {
      type: Number,
      required: true,
      default: 200
    }
  }
})
