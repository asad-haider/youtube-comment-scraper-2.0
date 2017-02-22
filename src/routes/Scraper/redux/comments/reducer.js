import * as types from './action-types'
import { Map, List, fromJS } from 'immutable'

const initialState = Map({
  byId: Map(),
  ids: List()
})

const addComments = (state, action) => {
  const { comments } = action.payload
  const { byId, ids } = state.toObject()

  const newComments = List(comments)
    .map(c => c.replies ? ({ ...c, replies: c.replies.map(r => r.id) }) : c)
    .map(c => fromJS(c))

  const newCommentsById = newComments
    .reduce((ncs, c) => ncs.set(c.get('id'), c), Map())

  return state.merge({
    byId: byId.merge(newCommentsById),
    ids: ids.concat(newComments.map(c => c.get('id')))
  })
}

export default function commentsReducer (state = initialState, action) {
  switch (action.type) {
    case types.COMMENTS_ADDED:
      return addComments(state, action)

    default:
      return state
  }
}
