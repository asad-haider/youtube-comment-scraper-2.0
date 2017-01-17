import * as types from './action-types'
import prop from 'propper'
import { Map, List } from 'immutable'

const initialState = Map({
  socket: null,
  videoId: null,
  videoUrl: null,
  videoTitle: null,
  totalComments: null,
  complete: false,
  comments: List()
})

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

    case types.COMMENT_RECEIVED:
      return state.update('comments', cs => cs.push(prop(action, 'payload.comment')))

    default:
      return state
  }
}
