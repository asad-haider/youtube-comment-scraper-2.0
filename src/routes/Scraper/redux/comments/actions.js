import * as types from './action-types'

export function commentsAdded (comments) {
  return {
    type: types.COMMENTS_ADDED,
    payload: { comments }
  }
}
