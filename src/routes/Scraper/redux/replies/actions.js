import * as types from './action-types'

export function repliesAdded (replies) {
  return {
    type: types.REPLIES_ADDED,
    payload: { replies }
  }
}
