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

console.log('initialState', initialState.toJS())

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
      return state.set('replies', !state.get('replies'))

    case types.TOGGLE_COLLAPSED_REPLIES:
      return state.set('collapsedReplies', !state.get('collapsedReplies'))

    default:
      return state
  }
}
