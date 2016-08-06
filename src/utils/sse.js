/*global API_URL*/
import log from 'loglevel'

// generic sse wrapper
export default class Sse {

  constructor (url) {
    if (!window.EventSource) {
      log.error('Sse not supported.')
    }

    url = this.url = `${API_URL}/sse${url}`
    const source = this.source = new EventSource(url)

    source.addEventListener('error', event => {
      if (event.readyState === EventSource.CLOSED) {
        log.warn('Sse event source closed by server.')
      }
    }, false)
  }

  on (message, cb) {
    this.source.addEventListener(message, event => {
      let data = null
      try {
        data = JSON.parse(event.data)
      } catch (err) {
        log.err('Sse json parse failed.', event.data)
      }
      cb(data)
    }, false)
  }

  close () {
    this.source.close()
  }
}
