import Vue from 'vue'
import $ from 'jquery'
import 'codemirror/mode/javascript/javascript'
import CodeMirror from 'codemirror/lib/codemirror'

// use it with strings, to fall back to plain textarea
// use v-model instead of v-codemirror
export default {
  params: ['maximized'],
  twoWay: true,
  paramWatchers: {
    maximized: function (value) {
      this.$cmEl.toggleClass('maximized', value)
      this.cm.refresh()
    }
  },
  bind: function () {
    const $el = this.$el = $(this.el)
    const $cmEl = this.$cmEl = $('<div class="codemirror-wrapper"></div>')
    this.size = {
      width: $el.outerWidth,
      height: $el.outerHeight
    }
    $cmEl.css({
      width: this.size.width,
      height: this.size.height
    }).insertAfter(this.el)
    $el.hide()
  },
  update: function (value) {
    this.cm = CodeMirror(this.$cmEl.get(0), {
      value,
      tabSize: 2,
      mode: 'javascript'
    })
    this.cm.on('change', cm => {
      const val = cm.getValue()
      this.$el.val(val)
      this.set(val)
    })
    this.cm.on('blur', cm => {
      var event = new FocusEvent('blur', {view: window, bubbles: false, cancelable: true})
      this.$el.get(0).dispatchEvent(event)
    })
    Vue.nextTick(() => this.cm.refresh())
  }
}
