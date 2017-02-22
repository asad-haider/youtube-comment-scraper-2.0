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
      dispatch(setIncludeRepliesDelayed(includeReplies))
    }, 50)
  }
}

export function setIncludeRepliesReq (includeReplies) {
  return {
    type: types.SET_INCLUDE_REPLIES_REQ,
    payload: { includeReplies }
  }
}

export function setIncludeRepliesDelayed (includeReplies) {
  return {
    type: types.SET_INCLUDE_REPLIES,
    payload: { includeReplies }
  }
}

export function setRepliesCollapsed (repliesCollapsed) {
  return (dispatch) => {
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

export function setColumnSortDir (key, sortDir) {
  return (dispatch, getState) => {
    dispatch(setColumnSortDirReq(key, sortDir))

    setTimeout(() => {
      dispatch(setColumnSortDirDelayed(key, sortDir))
    }, 50)
  }
}

export function setColumnSortDirReq (key, sortDir) {
  return {
    type: types.SET_COLUMN_SORT_DIR_REQ,
    payload: { key, sortDir }
  }
}

export function setColumnSortDirDelayed (key, sortDir) {
  return {
    type: types.SET_COLUMN_SORT_DIR,
    payload: { key, sortDir }
  }
}
