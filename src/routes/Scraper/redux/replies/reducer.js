import types from '../action-types'
import { Map } from 'immutable'

const initialState = Map()

export default function repliesReducer (state = initialState, action) {
  switch (action.type) {
    case types.comments.COMMENTS_ADDED:
      return state.merge(
        action.payload.comments
          .reduce((rs, c) =>
            c.hasReplies
              ? rs.merge(c.replies.reduce((rs, r) => rs.set(r.id, Map(r)), Map()))
              : rs,
            Map()))

    default:
      return state
  }
}
