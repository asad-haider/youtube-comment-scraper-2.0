import { List, Map } from 'immutable'
import * as types from './action-types'

export function toggleColumn (key) {
  return (dispatch) => {
    dispatch(toggleColumnReq(key))

    setTimeout(() =>
      dispatch(toggleColumnDelayed(key)), 50)
  }
}

export function toggleColumnReq (key) {
  return {
    type: types.TOGGLE_COLUMN_REQ,
    payload: { key }
  }
}

export function toggleColumnDelayed (key) {
  return {
    type: types.TOGGLE_COLUMN,
    payload: { key }
  }
}

export function setIncludeReplies (includeReplies) {
  return (dispatch, getState) => {
    dispatch(setIncludeRepliesReq(includeReplies))

    setTimeout(() => {
      const rows = updateRows(getState(), { includeReplies })
      dispatch(setIncludeRepliesDelayed(includeReplies, rows))
    }, 50)
  }
}

function updateRows (state, override = {}) {
  const { resultEditor, comments } = state

  const includeReplies = override.includeReplies == null
    ? resultEditor.get('includeReplies')
    : override.includeReplies

  if (!includeReplies) {
    return comments.toList().map(c => Map({ commentId: c.get('id') }))
  } else {
    return comments.reduce((cs, c) =>
      cs.concat(List.of(Map({ commentId: c.get('id') })))
        .concat(c.get('hasReplies')
          ? c.get('replies').map(rId => Map({ replyId: rId }))
          : List()),
      List())
  }
}

export function setIncludeRepliesReq (includeReplies) {
  return {
    type: types.SET_INCLUDE_REPLIES_REQ,
    payload: { includeReplies }
  }
}

export function setIncludeRepliesDelayed (includeReplies, rows) {
  return {
    type: types.SET_INCLUDE_REPLIES,
    payload: { includeReplies, rows }
  }
}

export function setRepliesCollapsed (repliesCollapsed) {
  return (dispatch, getState) => {
    dispatch(setRepliesCollapsedReq(repliesCollapsed))

    setTimeout(() => {
      dispatch(setRepliesCollapsedDelayed(repliesCollapsed))
    }, 50)
  }
}

export function setRepliesCollapsedReq (repliesCollapsed) {
  return {
    type: types.SET_REPLIES_COLLAPSED_REQ,
    payload: { repliesCollapsed }
  }
}

export function setRepliesCollapsedDelayed (repliesCollapsed) {
  return {
    type: types.SET_REPLIES_COLLAPSED,
    payload: { repliesCollapsed }
  }
}
