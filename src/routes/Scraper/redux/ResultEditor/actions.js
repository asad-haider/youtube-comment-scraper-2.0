import * as types from './action-types'

export function toggleColumn (key) {
  return {
    type: types.TOGGLE_COLUMN,
    payload: { key }
  }
}

export function setIncludeReplies (includeReplies) {
  return {
    type: types.SET_INCLUDE_REPLIES,
    payload: { includeReplies }
  }
}

export function setRepliesCollapsed (repliesCollapsed) {
  return {
    type: types.SET_REPLIES_COLLAPSED,
    payload: { repliesCollapsed }
  }
}
