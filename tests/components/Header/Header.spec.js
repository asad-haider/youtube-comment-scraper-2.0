import React from 'react'
import { Header } from 'components/Header/Header'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Should render the title', () => {
    const title = _wrapper.find('.pt-navbar-heading')
    expect(title).to.exist
    expect(title.text()).to.match(/YouTube Comment Scraper/i)
  })

  describe('Navigation Buttons...', () => {
    it('Should render a Link Button to Home route', () => {
      const homeLink = _wrapper.find('.pt-button.pt-icon-home')
      expect(homeLink).to.exist
      expect(homeLink.text()).to.match(/Home/i)
    })

    it('Should render a Link Button to Stats route', () => {
      const statsLink = _wrapper.find('.pt-button.pt-icon-timeline-bar-chart')
      expect(statsLink).to.exist
      expect(statsLink.text()).to.match(/Stats/i)
    })

    it('Should render a Link Button to Testimonials route', () => {
      const testimonialsLink = _wrapper.find('.pt-button.pt-icon-comment')
      expect(testimonialsLink).to.exist
      expect(testimonialsLink.text()).to.match(/Testimonials/i)
    })

    it('Should render a Link Button to Code repo', () => {
      const repoLink = _wrapper.find('.pt-button.pt-icon-code')
      expect(repoLink).to.exist
      expect(repoLink.text()).to.match(/Code/i)
    })
  })
})
