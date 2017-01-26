import * as types from './action-types'
import Immutable, { Map } from 'immutable'
import prop from 'propper'
import { pick, keyBy } from 'lodash'

import defaultColumns from '../../components/CommentTable/columns'

const importDefaultColumns = () =>
  Map(keyBy(defaultColumns, 'key'))
    .map(c => Immutable.fromJS(pick(c, 'key')).set('active', true))

const initialState = Map({
  columns: importDefaultColumns(),
  includeReplies: true,
  repliesCollapsed: false
})

export default function resultEditorReducer (state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_COLUMN:
      return state.updateIn(['columns', action.payload.key], col =>
        col.set('active', !col.get('active')))

    case types.SET_INCLUDE_REPLIES:
      return setReplyColumns(
        state.set('includeReplies', prop(action, 'payload.includeReplies')),
        prop(action, 'payload.includeReplies'))

    case types.SET_REPLIES_COLLAPSED:
      return setReplyColumns(
        state.set('repliesCollapsed', prop(action, 'payload.repliesCollapsed')),
        !prop(action, 'payload.repliesCollapsed'))

    default:
      return state
  }
}

function setReplyColumns (state, active) {
  return state.update('columns', cols =>
    cols.map((col, key) =>
      (/^reply_/.test(key))
        ? col.set('active', active)
        : col))
}
