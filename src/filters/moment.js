import moment from 'moment'

export default (value, format = 'HH:mm:ss') => {
  return moment(value).format(format)
}
