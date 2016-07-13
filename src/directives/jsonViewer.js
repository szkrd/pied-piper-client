import $ from 'jquery'

export default {
  update: function (value) {
    if (value === undefined) {
      return
    }
    $(this.el).addClass('json-viewer').jsonViewer(value)
  }
}
