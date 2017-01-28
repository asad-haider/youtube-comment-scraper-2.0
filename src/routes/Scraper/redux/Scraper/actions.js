import fileDownload from 'react-file-download'
import { pick } from 'lodash'
import { List } from 'immutable'
import json2csv from 'json2csv'

import * as types from './action-types'
import * as socketMessages from './socket-messages'
import initWebsocket from './websocket'

import * as resultEditorActions from './ResultEditor/actions'

module.exports = {
  ...resultEditorActions,
  init,
  socketInit,
  closeSocket,
  scrape,
  scraperComplete,
  scraperError,
  resetScraper,
  commentsReceived,
  videoInfoReceived,
  downloadCsv
}

function init () {
  return (dispatch) => {
    const socket = initWebsocket()

    socket.on(socketMessages.VIDEO_INFO, v => dispatch(videoInfoReceived(v)))
    socket.on(socketMessages.COMMENTS, cs => dispatch(commentsReceived(cs)))
    socket.on(socketMessages.SCRAPER_ERROR, e => dispatch(scraperError(e)))
    socket.on(socketMessages.SCRAPE_COMPLETE, () => dispatch(scraperComplete()))

    dispatch(socketInit(socket))
  }
}

function socketInit (socket) {
  return {
    type: types.INIT_SOCKET,
    payload: socket
  }
}

function closeSocket () {
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

function scrape (videoId) {
  return (dispatch, getState) => {
    const emit = getSocketMethod(getState(), 'emit')
    if (!emit) {
      return dispatch(scraperError('The scraper could not be initialized.'))
    }

    emit(socketMessages.SCRAPE, videoId, () => {
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

function scraperComplete () {
  return {
    type: types.SCRAPER_COMPLETE
  }
}

function scraperError (error) {
  return {
    type: types.SCRAPER_ERROR,
    payload: { error }
  }
}

function resetScraper () {
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

function commentsReceived (comments) {
  return {
    type: types.COMMENTS_RECEIVED,
    payload: { comments }
  }
}

function videoInfoReceived (videoInfo) {
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

function downloadCsv () {
  return (dispatch, getState) => {
    dispatch(downloadCsvReq())
    const { scraper } = getState()
    const fields = scraper.getIn(['resultEditor', 'columns'])
      .filter(c => c.get('active'))
      .toArray()
      .map(c => ({
        label: c.get('name'),
        value: r => r.get(c.get('key')),
        default: ''
      }))
    const data = scraper.get('editedComments').toArray()

    const csv = json2csv({ fields, data })
    fileDownload(csv, `${scraper.get('videoId')}.csv`)
    dispatch(downloadCsvComplete())
  }
}

function downloadCsvReq () {
  return {
    type: types.DOWNLOAD_CSV_REQ
  }
}

function downloadCsvComplete () {
  return {
    type: types.DOWNLOAD_CSV_COMPLETE
  }
}
