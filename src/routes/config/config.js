import Vue from 'vue'
import VueCo from 'vue-co'
import template from './config.html'
import { emit, on } from '../../utils/eventBus'
import * as configModel from '../../models/config'
import * as projectsModel from '../../models/projects'

export default VueCo({
  template,
  data: () => ({
    ready: false,
    projects: [],
    config: { // we need some of the config object because of the watchers below
      strict: null,
      recording: null,
      active: null,
      dump: null,
      sleep: 0,
      disabledProjects: []
    }
  }),
  watch: {
    'config.recording' (value) {
      this.updateKey('recording', value)
    },
    'config.strict' (value) {
      this.updateKey('strict', value)
    },
    'config.active' (value) {
      if (this.asleep) {
        return
      }
      this.updateKey('active', value)
      emit('ACTIVE_CHANGED', value)
    },
    'config.dump' (value) {
      this.updateKey('dump', value)
    },
    'config.sleep' (value) {
      if (value < 0) {
        this.config.sleep = 0
      }
    },
    'config.retryLockTimeout' (value) {
      if (value < 0) {
        this.config.retryLockTimeout = 0
      }
    },
    'config.disabledProjects' (value) {
      this.updateKey('disabledProjects', value)
    }
  },
  created () {
    on('ACTIVE_CHANGED', (state) => this.onActiveChangeEvent(state))
  },
  route: {
    activate () {
      this.onActivate()
    }
  },
  methods: {
    onActivate: function * () {
      this.ready = false
      const result = yield {
        config: configModel.get(),
        projects: projectsModel.get()
      }
      this.config = result.config
      this.projects = result.projects
      // skip initial fire for watchers
      Vue.nextTick(() => { this.ready = true })
    },
    updateSleep () {
      this.updateKey('sleep', this.config.sleep)
    },
    updateRetryLockTimeout () {
      this.updateKey('retryLockTimeout', this.config.retryLockTimeout)
    },
    updateKey: function (key, value) {
      if (!this.ready) {
        return
      }
      configModel.updateKey(key, value)
    },
    onActiveChangeEvent (state) {
      if (this.config.active === state) {
        return
      }
      this.asleep = true
      this.config.active = state
      Vue.nextTick(() => { this.asleep = false })
    }
  }
})
