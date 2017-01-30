import Testimonials from 'routes/Testimonials'

describe('(Route) Testimonials', () => {
  let _route

  beforeEach(() => {
    _route = Testimonials({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `stats`', () => {
    expect(_route.path).to.equal('testimonials')
  })
})
