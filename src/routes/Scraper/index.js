import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'scraper/(:videoId)',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ScraperContainer = require('./containers/ScraperContainer').default

      const commentsReducer = require('./redux/comments').default
      injectReducer(store, { key: 'comments', reducer: commentsReducer })

      const repliesReducer = require('./redux/replies').default
      injectReducer(store, { key: 'replies', reducer: repliesReducer })

      const resultEditorReducer = require('./redux/resultEditor').default
      injectReducer(store, { key: 'resultEditor', reducer: resultEditorReducer })

      const scraperReducer = require('./redux/scraper').default
      injectReducer(store, { key: 'scraper', reducer: scraperReducer })

      const videoInfoReducer = require('./redux/videoInfo').default
      injectReducer(store, { key: 'videoInfo', reducer: videoInfoReducer })

      /*  Return getComponent   */
      cb(null, ScraperContainer)

    /* Webpack named bundle   */
    }, 'scraper')
  }
})
