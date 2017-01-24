import * as types from './action-types'

import initWebsocket from './websocket'

export function init () {
  return (dispatch) => {
    const socket = initWebsocket()

    socket.on('SCRAPER_ERROR', e => dispatch(scraperError(e)))
    socket.on('COMMENTS', cs => dispatch(commentsReceived(cs)))
    socket.on('VIDEO_INFO', v => dispatch(videoInfoReceived(v)))
    socket.on('SCRAPER_COMPLETE', () => {
      console.log('COMPLETE!!!')
      dispatch(scraperComplete())
    })

    dispatch(socketInit(socket))
  }
}

export function socketInit (socket) {
  return {
    type: types.INIT_SOCKET,
    payload: socket
  }
}

export function closeSocket () {
  return (dispatch, getState) => {
    closeSocketInState(getState())
    dispatch(socketClosed())
  }
}

function socketClosed () {
  return {
    type: types.SOCKET_CLOSED
  }
}

export function scrape (videoId) {
  return (dispatch, getState) => {
    const emit = getSocketMethod(getState(), 'emit')
    if (!emit) {
      return dispatch(scraperError('The scraper could not be initialized.'))
    }

    emit(types.SCRAPE, videoId, () => {
      dispatch(scrapeStarted(videoId))
    })
  }
}

function scrapeStarted (videoId) {
  return {
    type: types.SCRAPE,
    payload: { videoId }
  }
}

export function scraperComplete () {
  console.log('SCRAPER COMPLETE!')
  return {
    type: types.SCRAPER_COMPLETE
  }
}

export function scraperError (error) {
  return {
    type: types.SCRAPER_ERROR,
    payload: { error }
  }
}

export function resetScraper () {
  return (dispatch, getState) => {
    closeSocketInState(getState())
    dispatch(scraperReset())
  }
}

function scraperReset () {
  return {
    type: types.SCRAPER_RESET
  }
}

export function commentsReceived (comments) {
  return {
    type: types.COMMENTS_RECEIVED,
    payload: { comments }
  }
}

export function videoInfoReceived (videoInfo) {
  return {
    type: types.VIDEO_INFO_RECEIVED,
    payload: { videoInfo }
  }
}

function getSocketMethod (state, method) {
  const { scraper } = state
  return scraper.getIn(['socket', method])
}

function closeSocketInState (state) {
  const socketClose = getSocketMethod(state, 'close')
  if (socketClose) {
    socketClose()
  }
}
