/*global API_URL*/
import { getJSON } from './utils/fetch'
const urlAll = (project) => `${API_URL}/proxied-resources/${project}`
const urlSingle = (project, id) => `${API_URL}/proxied-resource/${project}/${id}`

export function getAll (project) {
  return getJSON(urlAll(project))
}

export function get (project, id) {
  return getJSON(urlSingle(project, id))
}
