const express = require('express')
const debug = require('debug')('app:server')
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')
const { Observable } = require('rxjs')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')
const fetchVideoInfo = require('youtube-info')

const buildCommentStream = require('../../rx-youtube-comments')

const app = express()
const server = http.Server(app)

// Apply gzip compression
app.use(compress())

// Prepare Comment Streaming websocket

const io = socketIo(server)

// TODO: add persistent logs
io.on('connection', socket => {
  const disconnect$ = Observable.create(observer =>
    socket.on('disconnect', () => {
      observer.next('disconnected')
      observer.complete()
    }))

  const scrapeRequest$ = Observable.create(observer => {
    socket.on('SCRAPE', (videoId, ack) => {
      ack(videoId)
      observer.next(videoId)
      observer.complete()
    })
  })

  scrapeRequest$
    .do(vid => console.log('SCRAPE', vid))
    .mergeMap(videoId => Observable.fromPromise(fetchVideoInfo(videoId)))
    .do(videoInfo => socket.emit('VIDEO_INFO', videoInfo))
    .concatMap(({ videoId }) => buildCommentStream(videoId))
    .takeUntil(disconnect$)
    .subscribe({
      next: c => socket.emit('COMMENT', c),
      error: e => {
        socket.emit('SCRAPER_ERROR', e)
        console.error('error', e)
      },
      complete: () => {
        socket.emit('SCRAPER_COMPLETE')
        console.log('SCRAPER_COMPLETE')
      }
    })
})

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

module.exports = server
