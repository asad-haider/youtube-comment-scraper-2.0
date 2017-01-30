import React from 'react'
import { bindActionCreators } from 'redux'
import { StatsView } from 'routes/Stats/components/StatsView'
import { shallow } from 'enzyme'
import { PageLayout } from 'layouts/PageLayout/PageLayout'

describe('(Component) StatsView', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {}
    _wrapper = shallow(<StatsView {..._props} />)
  })

  it('Should render as a PageLayout.', () => {
    expect(_wrapper.is(PageLayout)).to.equal(true)
  })

  it('Should contain a title.', () => {
    expect(_wrapper.find('h2').text()).to.match(/Stats/i)
  })
})
