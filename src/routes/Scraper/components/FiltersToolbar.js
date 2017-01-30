import React, { Component, PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'

import './FiltersToolbar.scss'

class FiltersToolbar extends Component {
  displayName: 'FiltersToolbar'
  propTypes: {
    loading: PropTypes.boolean,
  }
  defaultProps: {
    loading: true,
    toggleDataOptions: () => {},
    toggleFilters: () => {}
  }

  render () {
    const { loading } = this.props

    return (
      <div className='scraper-toolbar-component'>
        <Flex className='scraper-toolbar'>
          <Box>
            <h3>Filters Toolbar</h3>
            {loading && <em>Loading...</em>}
          </Box>
        </Flex>
      </div>
    )
  }
}

export default FiltersToolbar
