import React, { Component, PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'

import './ScraperToolbar.scss'

class ScraperToolbar extends Component {
  displayName: 'ScraperToolbar'
  propTypes: {
    loading: PropTypes.boolean
  }
  defaultProps: {
    loading: true
  }

  render () {
    const { loading } = this.props

    return (
      <div className='scraper-toolbar-component'>
        <Flex className='scraper-toolbar'>
          <Box>
            <div className='pt-button-group pt-minimal'>
              <button className='pt-button pt-icon-database' disabled={!loading}>
                Data Options
              </button>
              <button className='pt-button pt-icon-filter-list' disabled={!loading}>
                Filters
              </button>
              <button className='pt-button pt-icon-floppy-disk' disabled={!loading}>
                Save
                <span className='pt-icon-standard pt-icon-caret-down pt-align-right' />
              </button>
            </div>
          </Box>
        </Flex>
      </div>
    )
  }
}

export default ScraperToolbar
