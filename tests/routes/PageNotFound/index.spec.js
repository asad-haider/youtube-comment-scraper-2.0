import PageNotFound from 'routes/PageNotFound'

describe('(Route) PageNotFound', () => {
  let _route

  beforeEach(() => {
    _route = PageNotFound({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `error-report`', () => {
    expect(_route.path).to.equal('*')
  })
})
