import * as types from '../action-types'
import Immutable, { Map } from 'immutable'
import prop from 'propper'
import { pick, keyBy } from 'lodash'

import defaultColumns from '../../../components/CommentTable/columns'

const importDefaultColumns = () =>
  Map(keyBy(defaultColumns, 'key'))
    .map(c => Immutable.fromJS({ ...pick(c, 'key'), active: true, display: true }))

console.log('defaultColumns', importDefaultColumns(defaultColumns).toJS())

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
  console.log('setReplyColumns to', active)
  return state.update('columns', cols =>
    cols.map((col, key) =>
      (/^reply_/.test(key))
        ? col.merge({active: active, display: active})
        : col))
}
