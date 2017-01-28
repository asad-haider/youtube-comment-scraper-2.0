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

      const scraperReducer = require('./redux/Scraper').default
      injectReducer(store, { key: 'scraper', reducer: scraperReducer })

      /*  Return getComponent   */
      cb(null, ScraperContainer)

    /* Webpack named bundle   */
    }, 'scraper')
  }
})
