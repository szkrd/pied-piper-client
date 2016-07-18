/*global API_URL*/
import { getJSON, putJSON, deleteJSON } from './utils/fetch'
import qs from 'qs'

export function getAll (project, query) {
  query = qs.stringify(query)
  return getJSON(`${API_URL}/proxied-resources/${project}?${query}`)
}

export function get (project, id) {
  return getJSON(`${API_URL}/proxied-resource/${project}/${id}`)
}

export function set (project, id, value) {
  return putJSON(`${API_URL}/proxied-resource/${project}/${id}`, value)
}

export function remove (project, id) {
  return deleteJSON(`${API_URL}/proxied-resource/${project}/${id}`)
}

export function removeAll (project, id) {
  return deleteJSON(`${API_URL}/proxied-resources/${project}`)
}

export function toggle (project, id) {
  return putJSON(`${API_URL}/proxied-resource/toggle/${project}/${id}`)
}
