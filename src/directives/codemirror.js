import Vue from 'vue'
import $ from 'jquery'
import 'codemirror/mode/javascript/javascript'
import CodeMirror from 'codemirror/lib/codemirror'

const template = `
  <div class="codemirror-wrapper">
    <a class="resize-button">
      <span class="glyphicon glyphicon-fullscreen"></span>
    </a>
  </div>
`.replace(/\s{2,}/g, ' ').replace(/\n/g, '')

// use it with strings, to fall back to plain textarea
// (use v-model instead of v-codemirror)
export default {
  twoWay: true,
  resize: function () {
    $('body').toggleClass('covered')
    this.$cmEl.toggleClass('maximized')
    this.cm.refresh()
  },
  bind: function () {
    const $el = this.$el = $(this.el)
    const $cmEl = this.$cmEl = $(template)

    // set up wrapper and textarea
    this.size = {
      width: $el.outerWidth,
      height: $el.outerHeight
    }
    $cmEl.css({
      width: this.size.width,
      height: this.size.height
    }).insertAfter(this.el)
    $cmEl.find('a').on('click', this.resize.bind(this))
    $el.on('focus', () => this.cm.focus())
    $el.addClass('codemirror-fake-hide')

    // set up cm
    this.cm = CodeMirror(this.$cmEl.get(0), {
      value: '',
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
  },
  update: function (value) {
    this.cm.setValue(value)
    Vue.nextTick(() => this.cm.refresh())
  }
}
