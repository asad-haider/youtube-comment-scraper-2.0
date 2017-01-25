import * as types from './action-types'
import prop from 'propper'
import Immutable, { Map, List } from 'immutable'

const initialState = Map({
  socket: null,
  videoInfo: null,
  complete: false,
  comments: List()
})

export default function resultEditorReducer (state = initialState, action) {
  switch (action.type) {


    default:
      return state
  }
}
