import Vue from 'vue'
import VueCo from 'vue-co'
import template from './proxiedResources.html'
import storage from '../../models/persistentStorage'
import * as projectsModel from '../../models/projects'
import * as configModel from '../../models/config'

export default VueCo({
  template,
  data: () => ({
    ready: false,
    projects: []
  }),
  route: {
    data () {
      this.onData()
    }
  },
  methods: {
    onData: function * () {
      this.ready = false
      const { items, config } = yield {
        items: projectsModel.get(),
        config: configModel.get()
      }
      this.projects = (items || []).map(name => ({
        name,
        url: `/proxied-resources/${name}`,
        disabled: config.disabledProjects.includes(name)
      }))
      Vue.nextTick(() => { this.ready = true })

      // if we have a stored project name and that one still exists...
      let activeProject = storage.activeProject
      if (!items.includes(activeProject)) {
        activeProject = storage.activeProject = ''
      }
      if (activeProject) {
        this.$router.replace(`/proxied-resources/${activeProject}`)
      }
    }
  }
})
