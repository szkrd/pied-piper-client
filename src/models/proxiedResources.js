/*global API_URL*/
import { getJSON, putJSON, deleteJSON } from './utils/fetch'

export function getAll (project) {
  return getJSON(`${API_URL}/proxied-resources/${project}`)
}

export function get (project, id) {
  return getJSON(`${API_URL}/proxied-resource/${project}/${id}`)
}

export function remove (project, id) {
  return deleteJSON(`${API_URL}/proxied-resource/${project}/${id}`)
}

export function toggle (project, id) {
  return putJSON(`${API_URL}/proxied-resource/toggle/${project}/${id}`)
}
