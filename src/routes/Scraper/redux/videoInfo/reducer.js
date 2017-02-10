import * as types from './action-types'
import { Map } from 'immutable'

const initialState = Map()

export default function repliesReducer (state = initialState, action) {
  switch (action.type) {
    case types.VIDEO_INFO_RECEIVED:
      return Map(action.payload.videoInfo)

    default:
      return state
  }
}
