import * as types from '../action-types'
import { Map, OrderedMap, fromJS } from 'immutable'
import prop from 'propper'
import { pick } from 'lodash'

import defaultColumns from '../../../components/CommentTable/columns'

const importDefaultColumns = () =>
  defaultColumns.reduce((m, c) => {
    const col = fromJS({ ...pick(c, ['key', 'name']), active: true, display: true })
    return m.set(c.key, col)
  }, OrderedMap())

const initialState = Map({
  operationPending: false,
  columns: importDefaultColumns(),
  includeReplies: true,
  repliesCollapsed: false
})

export default function resultEditorReducer (state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_COLUMN_REQ:
      return state
        .updateIn(['columns', action.payload.key], col =>
          col.set('active', !col.get('active')))
        .set('operationPending', true)

    case types.TOGGLE_COLUMN:
      return state
        .updateIn(['columns', action.payload.key], col =>
          col.set('display', !col.get('display')))
        .set('operationPending', false)

    case types.SET_INCLUDE_REPLIES_REQ:
      return state
        .set('includeReplies', prop(action, 'payload.includeReplies'))
        .set('operationPending', true)

    case types.SET_INCLUDE_REPLIES:
      return setReplyColumns(
        state
          .set('includeReplies', prop(action, 'payload.includeReplies'))
          .set('operationPending', false),
        prop(action, 'payload.includeReplies'))

    case types.SET_REPLIES_COLLAPSED_REQ:
      return state
        .set('repliesCollapsed', prop(action, 'payload.repliesCollapsed'))
        .set('operationPending', true)

    case types.SET_REPLIES_COLLAPSED:
      return setReplyColumns(
        state
          .set('repliesCollapsed', prop(action, 'payload.repliesCollapsed'))
          .set('operationPending', false),
        !prop(action, 'payload.repliesCollapsed'))

    default:
      return state
  }
}

function setReplyColumns (state, active) {
  return state.update('columns', cols =>
    cols.map((col, key) =>
      (/^reply_/.test(key))
        ? col.merge({ active: active, display: active })
        : col))
}
