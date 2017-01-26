import React, { Component, PropTypes } from 'react'
import { AnchorButton, Popover, PopoverInteractionKind, Position, Menu, MenuItem } from '@blueprintjs/core'

import './ScraperToolbar.scss'

class ScraperToolbar extends Component {
  displayName: 'ScraperToolbar'
  propTypes: {
    loading: PropTypes.boolean,
    complete: PropTypes.boolean,
    dataOptionsToolbar: PropTypes.boolean,
    filtersToolbar: PropTypes.boolean,
    toggleDataOptionsToolbar: PropTypes.func,
    toggleFiltersToolbar: PropTypes.func
  }
  defaultProps: {
    loading: true,
    complete: false,
    dataOptionsToolbar: false,
    filtersToolbar: false,
    toggleDataOptionsToolbar: () => {},
    toggleFiltersToolbar: () => {}
  }

  constructor (props) {
    super(props)

    this.renderDownloadMenu = this.renderDownloadMenu.bind(this)
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

          {this.renderDownloadMenu()}

        </div>
      </div>
    )
  }

  renderDownloadMenu () {
    const { complete } = this.props

    const menu = (
      <Menu>
        <MenuItem
          iconName='pt-icon-th'
          onClick={this.downloadCsv}
          text='Download CSV' />
        <MenuItem
          iconName='pt-icon-path'
          onClick={this.downloadJson}
          text='Download JSON' />
      </Menu>
    )

    return (
      <Popover
        isDisabled={!complete}
        content={menu}
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName='pt-minimal'
        position={Position.BOTTOM_LEFT}
        useSmartPositioning={false}>

        <AnchorButton className='pt-button' iconName='pt-icon-floppy-disk' disabled={!complete}>
          Save
          <span className='pt-icon-standard pt-icon-caret-down pt-align-right' />
        </AnchorButton>
      </Popover>
    )
  }

  downloadCsv () {
    console.log('Download CSV')
  }

  downloadJson () {
    console.log('Download JSON')
  }
}

export default ScraperToolbar
