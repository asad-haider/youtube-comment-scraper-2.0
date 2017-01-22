import React, { Component, PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'

import './DataToolbar.scss'

class DataToolbar extends Component {
  displayName: 'DataToolbar'
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
            <h3>Data Toolbar</h3>
          </Box>
        </Flex>
      </div>
    )
  }
}

export default DataToolbar
