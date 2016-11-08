import VueCo from 'vue-co'
import template from './globalActiveSwitch.html'
import * as configModel from '../../models/config'
import { emit, on } from '../../utils/eventBus'

import favIcon0 from '../../assets/favicon_0.ico'
import favIcon1 from '../../assets/favicon_1.ico'
const favIcons = [ favIcon0, favIcon1 ]

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
  watch: {
    // quick hack to flip the favicon
    active (val) {
      console.log(1, val, favIcons, +val, favIcons[+val])
      document.querySelector('link[rel="shortcut icon"]').href = favIcons[+val]
    }
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
