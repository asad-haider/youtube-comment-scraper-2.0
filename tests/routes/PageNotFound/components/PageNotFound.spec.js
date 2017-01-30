import React from 'react'
import { bindActionCreators } from 'redux'
import { PageNotFound } from 'routes/PageNotFound/components/PageNotFound'
import { shallow } from 'enzyme'
import { IndexLink } from 'react-router'
import { PageLayout } from 'layouts/PageLayout/PageLayout'

describe('(Component) PageNotFound', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {}
    _wrapper = shallow(<PageNotFound {..._props} />)
  })

  it('Should render as a PageLayout.', () => {
    expect(_wrapper.is(PageLayout)).to.equal(true)
  })

  it('Should contain a warning icon.', () => {
    expect(_wrapper.find('.pt-icon.pt-icon-warning-sign')).to.exist
  })

  it('Should display an error message', () => {
    expect(_wrapper.find('h4').text()).to.match(/page doesn't exist/i)
  })

  it('Should render a button linking to the home route', () => {
    expect(_wrapper.find('IndexLink[to="/"]').exists()).to.be.true
    expect(_wrapper.find('IndexLink[to="/"] button').text()).to.match(/homepage/i)
  })
})
