const Task = require('data.task')
const fetchComments = require('youtube-comments-task')
const pFetchVideoInfo = require('youtube-info')
const { retry } = require('retry-task')

const socketMessages = require('../src/routes/Scraper/redux/Scraper/socket-messages')

const fetchVideoInfo = videoId =>
  new Task((rej, res) =>
    pFetchVideoInfo(videoId).then(res).catch(rej))

const fetchCommentsWithRetry = (videoId, pageToken) =>
  retry(3, () => fetchComments(videoId, pageToken))

const fetchYoutubeComments = (videoId, socket) => {
  const fetchAllComments = (videoId, pageToken) =>
    fetchCommentsWithRetry(videoId, pageToken)
      .chain(({ comments, nextPageToken }) => {
        if (!socket.connected) {
          return Task.of('Scrape cancelled (client disconnected)')
        }
        socket.emit(socketMessages.COMMENTS, comments)
        return nextPageToken
          ? fetchAllComments(videoId, nextPageToken)
          : Task.of('Scrape complete')
      })

  fetchVideoInfo(videoId)
    .map(v => socket.emit(socketMessages.VIDEO_INFO, v))
    .chain(_ => fetchAllComments(videoId))
    .fork(e => {
      socket.emit(socketMessages.SCRAPER_ERROR, 'Scrape failed')
      console.log('Scrape failed', e)
    }, succ => {
      socket.emit(socketMessages.SCRAPE_COMPLETE)
      console.log(succ)
    })
}

module.exports = fetchYoutubeComments
