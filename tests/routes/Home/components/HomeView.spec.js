import React from 'react'
import { HomeView } from 'routes/Home/components/HomeView'
import { ScraperForm } from 'routes/Home/components/ScraperForm'

import { shallow } from 'enzyme'

describe('(View) HomeView', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<HomeView />)
  })

  it('Renders a title', () => {
    const title = _component.find('.page-cover h1')
    expect(title).to.exist
    expect(title.text()).to.match(/Scrape Comments/)
  })

  it('Renders the ScraperForm', () => {
    expect(_component.contains(<ScraperForm />)).to.be.true
  })
})
