import * as types from './action-types'
import prop from 'propper'
import Immutable, { Map, List } from 'immutable'

import resultEditorReducer from './ResultEditor'

const initialState = Map({
  socket: null,
  videoInfo: null,
  complete: false,
  comments: List(),
  editedComments: List(),
  resultEditor: resultEditorReducer(undefined, {})
})

const immutableFromProp = (object, path) =>
  Immutable.fromJS(prop(object, path))

export default function scraperReducer (state = initialState, action) {
  switch (action.type) {
    case types.INIT_SOCKET:
      return state.set('socket', Map(action.payload))

    case types.SOCKET_CLOSED:
      return state.set('socket', null)

    case types.SCRAPE:
      return state.set('videoId', prop(action, 'payload.videoId'))

    case types.SCRAPER_COMPLETE:
      return state.set('complete', true)

    case types.SCRAPER_ERROR:
      return state.set('error', prop(action, 'payload.error'))

    case types.SCRAPER_RESET:
      return initialState

    case types.VIDEO_INFO_RECEIVED:
      return state.set('videoInfo', immutableFromProp(action, 'payload.videoInfo'))

    case types.COMMENTS_RECEIVED:
      return applyRepliesEdits(
        state.update('comments', cs => cs.concat(immutableFromProp(action, 'payload.comments'))))

    case types.SET_INCLUDE_REPLIES:
    case types.SET_REPLIES_COLLAPSED:
      return applyResultEditorReducer(applyRepliesEdits(state), action)

    case types.TOGGLE_COLUMN:
    case types.TOGGLE_COLUMN_REQ:
    case types.SET_INCLUDE_REPLIES_REQ:
    case types.SET_REPLIES_COLLAPSED_REQ:
      return applyResultEditorReducer(state, action)

    default:
      return state
  }
}

function applyResultEditorReducer (state, action) {
  return state.set('resultEditor', resultEditorReducer(state.get('resultEditor'), action))
}

function applyRepliesEdits (state) {
  const { comments, resultEditor } = state.toObject()

  return state.set('editedComments',
    (!resultEditor.get('includeReplies'))
      ? comments
      : (!resultEditor.get('repliesCollapsed'))
      ? comments.reduce((cs, c) => cs.concat(flattenReplies(c)), List())
      : comments.reduce((cs, c) => cs.concat(collapseReplies(c)), List()))
}

function flattenReplies (c) {
  if (!c.get('hasReplies')) {
    return List.of(c)
  }

  const replies = c.get('replies').map(r => r.mapKeys(k => `reply_${k}`))
  return List.of(c).concat(replies)
}

function collapseReplies (c) {
  return (!c.get('hasReplies'))
    ? List.of(c)
    : List.of(c).concat(c.get('replies'))
}
