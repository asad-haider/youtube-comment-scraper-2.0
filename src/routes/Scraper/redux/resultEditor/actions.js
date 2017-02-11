import * as types from './action-types'
import updateRows from './update-rows'

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
    const { resultEditor, comments } = getState()

    setTimeout(() => {
      const rows = updateRows({ resultEditor, comments: comments.toList() }, { includeReplies })
      dispatch(setIncludeRepliesDelayed(includeReplies, rows))
    }, 50)
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
