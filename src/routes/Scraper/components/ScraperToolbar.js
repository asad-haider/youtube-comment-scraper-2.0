import React, { Component, PropTypes } from 'react'

import './ScraperToolbar.scss'

class ScraperToolbar extends Component {
  displayName: 'ScraperToolbar'
  propTypes: {
    loading: PropTypes.boolean,
    dataOptionsToolbar: PropTypes.boolean,
    filtersToolbar: PropTypes.boolean,
    toggleDataOptionsToolbar: PropTypes.func,
    toggleFiltersToolbar: PropTypes.func
  }
  defaultProps: {
    loading: true,
    dataOptionsToolbar: false,
    filtersToolbar: false,
    toggleDataOptionsToolbar: () => {},
    toggleFiltersToolbar: () => {}
  }

  render () {
    const {
      loading,
      dataOptionsToolbar,
      filtersToolbar,
      toggleDataOptionsToolbar,
      toggleFiltersToolbar
    } = this.props

    return (
      <div className='scraper-toolbar-component'>
        <div className='pt-button-group pt-minimal'>
          <button
            className={`pt-button pt-icon-database ${dataOptionsToolbar ? 'pt-active' : ''}`}
            onClick={toggleDataOptionsToolbar}
            disabled={!loading}>
              Data Options
          </button>
          <button
            className={`pt-button pt-icon-filter-list ${filtersToolbar ? 'pt-active' : ''}`}
            onClick={toggleFiltersToolbar}
            disabled={!loading}>
              Filters
          </button>
          <button className='pt-button pt-icon-floppy-disk' disabled={!loading}>
            Save
            <span className='pt-icon-standard pt-icon-caret-down pt-align-right' />
          </button>
        </div>
      </div>
    )
  }
}

export default ScraperToolbar
