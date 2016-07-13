import log from 'loglevel'
import hljs from 'highlight.js'

export default {
  update: function (value) {
    if (value === undefined) {
      return
    }
    this.el.classList.add(this.arg)
    if (this.arg === 'json') {
      try {
        value = JSON.stringify(value, null, '  ')
      } catch (err) {
        log.error('JSON stringify failed', err)
      }
    }
    this.el.innerHTML = value
    hljs.highlightBlock(this.el)
  }
}
