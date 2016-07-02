/*global API_URL*/
import { getJSON, deleteJSON } from './utils/fetch'
const url = `${API_URL}/projects`

export function get () {
  return getJSON(url)
}

export function remove (name) {
  return deleteJSON(`${url}/${name}`)
}
