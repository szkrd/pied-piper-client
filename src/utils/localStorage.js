// low level localStorage wrapper
import log from 'loglevel'

export function get (key) {
  let ret
  try {
    ret = JSON.parse(localStorage.getItem(key))
  } catch (err) {
    log.warn('LocalStorage set item error', err)
  }
  return ret
}

export function set (key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    log.warn('LocalStorage set item error', err)
  }
}

export function remove (key) {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    log.warn('LocalStorage remove item error', err)
  }
}
