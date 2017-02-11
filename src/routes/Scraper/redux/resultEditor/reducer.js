import types from '../action-types'
import { Map, List, OrderedMap, fromJS } from 'immutable'
import prop from 'propper'
import { pick } from 'lodash'

import updateRows from './update-rows'
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
  rows: List()
})

export default function resultEditorReducer (state = initialState, action) {
  switch (action.type) {
    case types.comments.COMMENTS_ADDED:
      return state.update('rows', rs =>
        rs.concat(updateRows({
          resultEditor: state,
          comments: fromJS(action.payload.comments)
            .map(c => c.get('hasReplies')
              ? c.set('replies', c.get('replies').map(r => r.get('id')))
              : c)
        })))

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
      return state.merge({
        includeReplies: prop(action, 'payload.includeReplies'),
        operationPending: true
      })

    case types.resultEditor.SET_INCLUDE_REPLIES:
      return setReplyColumns(
        state.merge({
          includeReplies: prop(action, 'payload.includeReplies'),
          operationPending: false,
          rows: prop(action, 'payload.rows')
        }),
        prop(action, 'payload.includeReplies'))

    case types.resultEditor.SET_REPLIES_COLLAPSED_REQ:
      return state.merge({
        repliesCollapsed: prop(action, 'payload.repliesCollapsed'),
        operationPending: true
      })

    case types.resultEditor.SET_REPLIES_COLLAPSED:
      return setReplyColumns(
        state.merge({
          repliesCollapsed: prop(action, 'payload.repliesCollapsed'),
          operationPending: false
        }),
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
