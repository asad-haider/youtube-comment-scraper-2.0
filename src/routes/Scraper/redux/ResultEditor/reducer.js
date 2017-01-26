import * as types from './action-types'
import Immutable, { Map } from 'immutable'
import { pick, keyBy } from 'lodash'

import defaultColumns from '../../components/CommentTable/columns'

const importDefaultColumns = () =>
  Map(keyBy(defaultColumns, 'key'))
    .map(c => Immutable.fromJS(pick(c, 'key')).set('active', true))

const initialState = Map({
  columns: importDefaultColumns(),
  replies: true,
  collapsedReplies: false
})


// TODO: TOGGLE IS BAD, use explicit setters!


export default function resultEditorReducer (state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_COLUMN:
      return state.updateIn(['columns', action.payload.key], col =>
        col.set('active', !col.get('active')))

    case types.TOGGLE_MULTIPLE_COLUMNS:
      return state.update('columns', cols =>
        action.payload.keys.forEach(k =>
          cols[k].set('active', !cols[k].get('active'))))

    case types.TOGGLE_REPLIES:
      return setReplyColumns(
        state.set('replies', !state.get('replies')),
        !state.get('replies'))

    case types.TOGGLE_COLLAPSED_REPLIES:
      return setReplyColumns(
        state.set('collapsedReplies', !state.get('collapsedReplies')),
        state.get('collapsedReplies'))

    default:
      return state
  }
}

function setReplyColumns (state, active) {
  return state.update('columns', cols =>
    cols.map((col, key) => {
      if (/^reply_/.test(key)) {
        return col.set('active', active)
      } else {
        return col
      }
    }))
}
