import React from 'react'
import { Footer } from 'components/Footer/Footer'
import { shallow } from 'enzyme'

describe('(Component) Footer', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Footer />)
  })

  it('Should render the footer', () => {
    const footer = _wrapper.find('.footer a.small')
    expect(footer).to.exist
    expect(footer.text()).to.match(/Philip Klostermann/i)
    expect(footer.prop('href')).to.match(/philip.klostermann.ca/i)
  })

  it('Should render the copyright for the current year', () => {
    const currentYear = (new Date()).getFullYear()
    const footer = _wrapper.find('.footer a.small')
    expect(footer).to.exist
    expect(footer.text().indexOf(`${currentYear}`) > 0).to.be.true
  })
})
