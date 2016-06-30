import Vue from 'vue'
import template from './vueTest.html'

export default Vue.extend({
  template,
  // props: {
  //   message: {
  //     type: String,
  //     required: true
  //   }
  // }
  data: () => ({
    message: 'xxx'
  }),
  route: {
    activate () {
      this.message = this.$route.params.message
    }
  }
})
