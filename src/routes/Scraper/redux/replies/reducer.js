import types from '../action-types'
import { Map, fromJS } from 'immutable'
import keyBy from '../../../../utils/immutable-key-by'

const initialState = Map({
  byId: Map()
})

const addReplies = (state, action) => {
  const { comments } = action.payload
  return state.update('byId', byId => {
    return byId.merge(comments.reduce((rs, r) => {
      return r.replies
        ? rs.merge(keyBy(r.replies.map(r => fromJS(r)), 'id'))
        : rs
    }, Map()))
  })
}

export default function repliesReducer (state = initialState, action) {
  switch (action.type) {
    case types.comments.COMMENTS_ADDED:
      return addReplies(state, action)

    default:
      return state
  }
}
