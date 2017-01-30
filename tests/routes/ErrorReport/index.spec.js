import ErrorReport from 'routes/ErrorReport'

describe('(Route) ErrorReport', () => {
  let _route

  beforeEach(() => {
    _route = ErrorReport({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `error-report`', () => {
    expect(_route.path).to.equal('error-report')
  })
})
