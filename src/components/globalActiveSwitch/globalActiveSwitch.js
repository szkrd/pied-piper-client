import VueCo from 'vue-co'
import template from './globalActiveSwitch.html'
import * as configModel from '../../models/config'
import { emit, on } from '../../utils/eventBus'

export default VueCo({
  template,
  data: () => ({
    active: null
  }),
  created () {
    on('ACTIVE_CHANGED', (state) => this.onActiveChangeEvent(state))
  },
  ready () {
    configModel.get({ include: ['active'] })
      .then((resp) => { this.active = resp.active })
  },
  methods: {
    onClick: function * () {
      yield configModel.updateKey('active', !this.active)
      emit('ACTIVE_CHANGED', !this.active)
    },
    onActiveChangeEvent (state) {
      if (this.active !== state) {
        this.active = state
      }
    }
  }
})
