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
      return applyCommentEdits(state.update('comments', cs =>
        cs.concat(immutableFromProp(action, 'payload.comments'))))

    case types.TOGGLE_COLUMN_REQ:
    case types.SET_INCLUDE_REPLIES_REQ:
    case types.SET_REPLIES_COLLAPSED_REQ:
      return applyResultEditorReducer(state, action)

    case types.TOGGLE_COLUMN:
      return applyCommentEdits(applyResultEditorReducer(state, action))

    case types.SET_INCLUDE_REPLIES:
    case types.SET_REPLIES_COLLAPSED:
      return applyCommentEdits(applyResultEditorReducer(state, action))

    default:
      return state
  }
}

const filterFields = fields => c =>
  c.filter((_, f) => fields.includes(f))

const isReplyField = f =>
  /^reply_/.test(f)

const stripReplyPrefix = f =>
  f.replace(/^reply_/, '')

function applyCommentEdits (state) {
  const { comments, resultEditor } = state.toObject()
  const activeCommentFields = resultEditor.get('columns')
    .toList()
    .filter(c => c.get('display'))
    .map(c => c.get('key'))
    .concat(resultEditor.get('includeReplies') ? List.of('replies') : List())

  const activeReplyFields = activeCommentFields
    .filter(f => resultEditor.get('repliesCollapsed') ? !isReplyField(f) : isReplyField(f))
    .map(stripReplyPrefix)

  const filterCommentFields = filterFields(activeCommentFields)
  const filterReplyFields = filterFields(activeReplyFields)

  const editedComments = comments
    .map(filterCommentFields)
    .map(c => c.get('replies')
      ? c.update('replies', rs => rs.map(filterReplyFields))
      : c)

  const res = state.set('editedComments', applyReplyEdits(editedComments, resultEditor))
  return res
}

function applyReplyEdits (comments, resultEditor) {
  return (!resultEditor.get('includeReplies'))
    ? comments
    : (!resultEditor.get('repliesCollapsed'))
    ? comments.reduce((cs, c) => cs.concat(flattenReplies(c)), List())
    : comments.reduce((cs, c) => cs.concat(collapseReplies(c)), List())
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

function applyResultEditorReducer (state, action) {
  return state.set('resultEditor', resultEditorReducer(state.get('resultEditor'), action))
}
