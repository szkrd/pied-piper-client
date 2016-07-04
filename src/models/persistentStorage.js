import { get as lsGet, set as lsSet } from '../utils/localStorage'
const key = 'ppclient_persistent'

const store = lsGet(key) || {
  activeProject: ''
}

function write (action) {
  action()
  lsSet(key, store)
}

export default Object.freeze({
  get activeProject () {
    return store.activeProject
  },
  set activeProject (name) {
    write(() => { store.activeProject = name })
  }
})
