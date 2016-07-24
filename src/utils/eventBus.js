// global event channel
// for anything more complicated use vuex, but now this is perfectly enough
import { EventEmitter } from 'events'

class Emitter extends EventEmitter {}
const emitter = new Emitter()

const events = [
  /**
   * active flag changed in runtime config or in
   * global active switch in the view's common part
   * @usage: config, globalActiveSwitch
   */
  'ACTIVE_CHANGED'
]

function safeguard (name) {
  if (!events.includes(name)) {
    throw new Error('Unknown event name, please add your event to the list with a short comment.')
  }
}

export function emit (name) {
  safeguard(name)
  const args = Array.from(arguments)
  args.shift()
  return emitter.emit(name, ...args)
}

export function on (name, callback) {
  safeguard(name)
  return emitter.on(name, callback)
}
