import * as types from './action-types'
import applyReplyOptions from './apply-reply-options'
import sortRows from './sort-rows'

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
      const rows = applyReplyOptions({ resultEditor, comments: comments.toList() }, { includeReplies })
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

function populateRows (rows, comments, replies) {
  return rows
    .map(r =>
      r.get('commentId')
        ? comments.get(r.get('commentId'))
        : r.get('replyId')
          ? replies.get(r.get('replyId'))
          : null)
    .filter(Boolean)
}

export function setColumnSortDir (key, sortDir) {
  return (dispatch, getState) => {
    dispatch(setColumnSortDirReq(key, sortDir))

    setTimeout(() => {
      const { resultEditor, comments, replies } = getState()
      const originalRows = applyReplyOptions(resultEditor.get('originalRows'), resultEditor)
      const originalComments = populateRows( )
      const rows = applyReplyOptions({ resultEditor })
      const repliesCollapsed = resultEditor.get('repliesCollapsed')

      if (!sortDir) {
        return dispatch(setColumnSortDirDelayed(key, sortDir, rows))
      }

      const sortedRows = sortRows({
        rows: originalRows,
        sortKey: key,
        comments,
        replies,
        repliesCollapsed,
        sortDir
      })

      dispatch(setColumnSortDirDelayed(key, sortDir, rows: sortedRows))
    }, 50)
  }
}

export function setColumnSortDirReq (key, sortDir) {
  return {
    type: types.SET_COLUMN_SORT_DIR_REQ,
    payload: { key, sortDir }
  }
}

export function setColumnSortDirDelayed (key, sortDir, rows) {
  return {
    type: types.SET_COLUMN_SORT_DIR,
    payload: { key, sortDir, rows }
  }
}
