import React from 'react'
import { ErrorReport } from 'routes/ErrorReport/components/ErrorReport'
import { shallow } from 'enzyme'
import { PageLayout } from 'layouts/PageLayout/PageLayout'

describe('(Component) ErrorReport', () => {
  let _props, _wrapper

  beforeEach(() => {
    _props = {}
    _wrapper = shallow(<ErrorReport {..._props} />)
  })

  it('Should render as a PageLayout.', () => {
    expect(_wrapper.is(PageLayout)).to.equal(true)
  })

  it('Should contain a title.', () => {
    expect(_wrapper.find('h2').text()).to.match(/Error Report/i)
  })
})
