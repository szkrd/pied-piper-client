/*global API_URL*/
import { getJSON, putJSON } from './utils/fetch'
const url = `${API_URL}/config`

export function get () {
  return getJSON(url)
}

export function updateKey (key, value) {
  return putJSON(url, { [key]: value })
}
