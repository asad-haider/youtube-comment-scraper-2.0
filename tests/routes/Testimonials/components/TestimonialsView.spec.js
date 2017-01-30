import React from 'react'
import { TestimonialsView } from 'routes/Testimonials/components/TestimonialsView'
import { shallow } from 'enzyme'
import { PageLayout } from 'layouts/PageLayout/PageLayout'

describe('(Component) TestimonialsView', () => {
  let _props, _wrapper

  beforeEach(() => {
    _props = {}
    _wrapper = shallow(<TestimonialsView {..._props} />)
  })

  it('Should render as a PageLayout.', () => {
    expect(_wrapper.is(PageLayout)).to.equal(true)
  })

  it('Should contain a title.', () => {
    expect(_wrapper.find('h2').text()).to.match(/Testimonials/i)
  })
})
