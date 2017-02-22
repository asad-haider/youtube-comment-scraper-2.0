import types from '../action-types'
import { Map, OrderedMap, fromJS } from 'immutable'
import prop from 'propper'
import { pick } from 'lodash'

import defaultColumns from '../../components/CommentTable/columns'

const importDefaultColumns = () =>
  defaultColumns.reduce((m, c) => {
    const col = fromJS({ ...pick(c, ['key', 'name']), active: true, display: true })
    return m.set(c.key, col)
  }, OrderedMap())

const initialState = Map({
  operationPending: false,
  includeReplies: true,
  repliesCollapsed: false,
  columns: importDefaultColumns(),
  columnSortDir: Map()
})

export default function resultEditorReducer (state = initialState, action) {
  switch (action.type) {
    case types.resultEditor.TOGGLE_COLUMN_REQ:
      return state
        .updateIn(['columns', action.payload.key], col =>
          col.set('active', !col.get('active')))
        .set('operationPending', true)

    case types.resultEditor.TOGGLE_COLUMN:
      return state
        .updateIn(['columns', action.payload.key], col =>
          col.set('display', !col.get('display')))
        .set('operationPending', false)

    case types.resultEditor.SET_INCLUDE_REPLIES_REQ:
      return state.set('operationPending', true)

    case types.resultEditor.SET_INCLUDE_REPLIES:
      return setReplyColumns(
        state.merge({
          includeReplies: prop(action, 'payload.includeReplies'),
          operationPending: false
        }),
        prop(action, 'payload.includeReplies'))

    case types.resultEditor.SET_REPLIES_COLLAPSED_REQ:
      return state.set('operationPending', true)

    case types.resultEditor.SET_REPLIES_COLLAPSED:
      return setReplyColumns(
        state.merge({
          repliesCollapsed: prop(action, 'payload.repliesCollapsed'),
          operationPending: false
        }),
        !prop(action, 'payload.repliesCollapsed'))

    case types.resultEditor.SET_COLUMN_SORT_DIR_REQ:
      return state.set('operationPending', true)

    case types.resultEditor.SET_COLUMN_SORT_DIR:
      return state.merge(fromJS({
        columnSortDir: {
          [prop(action, 'payload.key')]: prop(action, 'payload.sortDir')
        },
        operationPending: false
      }))

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
