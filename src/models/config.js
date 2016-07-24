/*global API_URL*/
import { getJSON, putJSON } from './utils/fetch'
import qs from 'querystring'
const url = `${API_URL}/config`

export function get (query) {
  query = query ? `/?${qs.stringify(query)}` : ''
  return getJSON(url + query)
}

export function updateKey (key, value) {
  return putJSON(url, { [key]: value })
}
