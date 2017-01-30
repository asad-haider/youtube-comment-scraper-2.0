import React from 'react'
import { ScraperForm } from 'routes/Home/components/ScraperForm'

import { shallow } from 'enzyme'

describe('(View) ScraperForm', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<ScraperForm />)
  })

  it('Renders as a div', () => {
    expect(_component.is('div')).to.be.true
  })

  it('Renders an text input element', () => {
    const input = _component.find('.pt-input-group input[name="videoUrl"]')
    expect(input).to.exist
  })
})
