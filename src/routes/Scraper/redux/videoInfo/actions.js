import * as types from './action-types'

export function videoInfoReceived (videoInfo) {
  return {
    type: types.VIDEO_INFO_RECEIVED,
    payload: { videoInfo }
  }
}
