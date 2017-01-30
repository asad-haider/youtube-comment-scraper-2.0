import Stats from 'routes/Stats'

describe('(Route) Stats', () => {
  let _route

  beforeEach(() => {
    _route = Stats({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `stats`', () => {
    expect(_route.path).to.equal('stats')
  })
})
