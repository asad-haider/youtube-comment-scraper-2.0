import * as types from './action-types'

import initWebsocket from './websocket'

export const init = () => {
  return (dispatch) => {
    const socket = initWebsocket()

    socket.on('SCRAPER_ERROR', e => dispatch(scraperError(e)))
    socket.on('COMMENT', c => dispatch(commentReceived(c)))

    dispatch({
      type: types.INIT_SOCKET,
      payload: socket
    })
  }
}

const getSocketMethod = (state, method) => {
  const { scraper } = state
  return scraper.getIn(['socket', method])
}

function commentReceived (comment) {
  return {
    type: types.COMMENT_RECEIVED,
    payload: { comment }
  }
}

export const close = () => {
  return (dispatch, getState) => {
    const closeSocket = getSocketMethod(getState(), 'close')
    if (closeSocket) {
      closeSocket()
    } else {
      console.error('Socket has not been initialized. No need to close it.')
    }
    dispatch(socketClosed())
  }
}

export const socketClosed = () => ({
  type: types.SOCKET_CLOSED
})

export const scrape = videoId =>
  (dispatch, getState) => {
    const emit = getSocketMethod(getState(), 'emit')
    if (!emit) {
      return dispatch(scraperError('The scraper could not be initialized.'))
    }

    emit(types.SCRAPE, videoId, () => {
      dispatch(scrapeStarted(videoId))
    })
  }

export const scrapeStarted = videoId => ({
  type: types.SCRAPE,
  payload: { videoId }
})

export const scraperError = error => ({
  type: types.SCRAPER_ERROR,
  payload: { error }
})
