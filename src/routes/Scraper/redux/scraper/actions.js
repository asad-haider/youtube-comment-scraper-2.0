import fileDownload from 'react-file-download'
import json2csv from 'json2csv'

import * as types from './action-types'
import * as socketMessages from './socket-messages'
import actions from '../actions'
import initWebsocket from './websocket'
import { applyColumnEdits } from './comment-edits'

export function scrape (videoId) {
  return (dispatch) => {
    const socket = initWebsocket()
    socket.on(socketMessages.VIDEO_INFO, v => dispatch(actions.videoInfo.videoInfoReceived(v)))
    socket.on(socketMessages.COMMENTS, cs => dispatch(actions.comments.commentsAdded(cs)))
    socket.on(socketMessages.SCRAPER_ERROR, e => dispatch(scraperError(e)))
    socket.on(socketMessages.SCRAPE_COMPLETE, () => dispatch(scraperComplete()))

    dispatch(socketInit(socket))

    socket.emit(socketMessages.SCRAPE, videoId, () => {
      dispatch(scrapeStarted(videoId))
    })
  }
}

function scraperError (error) {
  return {
    type: types.SCRAPER_ERROR,
    payload: { error }
  }
}

function scraperComplete () {
  return {
    type: types.SCRAPER_COMPLETE
  }
}

function socketInit (socket) {
  return {
    type: types.INIT_SOCKET,
    payload: socket
  }
}

function scrapeStarted (videoId) {
  return {
    type: types.SCRAPE,
    payload: { videoId }
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

export function downloadCsv () {
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

export function downloadJson () {
  return (dispatch, getState) => {
    dispatch(downloadJsonReq())

    const { scraper } = getState()
    const { comments, resultEditor } = scraper.toObject()

    const result = (resultEditor.get('repliesCollapsed'))
      ? scraper.get('editedComments') // if replies are collapsed, the edited comments contain everytyhing we need
      : applyColumnEdits(comments, resultEditor)

    fileDownload(JSON.stringify(result.toJS(), null, 2), `${scraper.get('videoId')}.json`)
    dispatch(downloadJsonComplete())
  }
}

function downloadJsonReq () {
  return {
    type: types.DOWNLOAD_JSON_REQ
  }
}

function downloadJsonComplete () {
  return {
    type: types.DOWNLOAD_JSON_COMPLETE
  }
}
