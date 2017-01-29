import * as types from './action-types'
import prop from 'propper'
import Immutable, { Map, List } from 'immutable'

import resultEditorReducer from './ResultEditor'
import { applyColumnEdits, applyReplyEdits } from './comment-edits'

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
      return buildEditedComments(state.update('comments', cs =>
        cs.concat(immutableFromProp(action, 'payload.comments'))))

    case types.TOGGLE_COLUMN_REQ:
    case types.SET_INCLUDE_REPLIES_REQ:
    case types.SET_REPLIES_COLLAPSED_REQ:
      return applyResultEditorReducer(state, action)

    case types.TOGGLE_COLUMN:
      return buildEditedComments(applyResultEditorReducer(state, action))

    case types.SET_INCLUDE_REPLIES:
    case types.SET_REPLIES_COLLAPSED:
      return buildEditedComments(applyResultEditorReducer(state, action))

    default:
      return state
  }
}

function buildEditedComments (state) {
  const { comments, resultEditor } = state.toObject()
  return state.set('editedComments',
    applyReplyEdits(applyColumnEdits(comments, resultEditor), resultEditor)
  )
}

function applyResultEditorReducer (state, action) {
  return state.set('resultEditor', resultEditorReducer(state.get('resultEditor'), action))
}
