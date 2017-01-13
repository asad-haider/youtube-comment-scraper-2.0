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

      /*  Return getComponent   */
      cb(null, ScraperContainer)

    /* Webpack named bundle   */
    }, 'Scraper')
  }
})
