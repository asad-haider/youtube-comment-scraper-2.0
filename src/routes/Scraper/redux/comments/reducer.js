// {
//   comments: { 'c1': { replies: ['r1', 'r2'] }, 'c2': {} },
//   replies: { 'r1': { commentId: 'c1' }, 'r2': { commentId: 'c2' } }
//   scraper: { socket: null, videoInfo: null, complete: false },
//   resultEditor: {
//     includeReplies: true,
//     repliesCollapsed: false,
//     columns: {},
//     rows: []
//   }
// }

import * as types from './action-types'
import { Map } from 'immutable'
import keyBy from 'lodash/keyBy'

const initialState = Map()

export default function commentsReducer (state = initialState, action) {
  switch (action.type) {
    case types.COMMENTS_ADDED:
      return state.merge(
        keyBy(
          action.payload.comments.map(c =>
            c.replies ? ({ ...c, replies: c.replies.map(r => r.id) }) : c),
          'id'))

    default:
      return state
  }
}
