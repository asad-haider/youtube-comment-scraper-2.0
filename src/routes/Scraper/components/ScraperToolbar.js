import React, { Component, PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Spinner,
  Classes,
  Intent,
  AnchorButton,
  Popover,
  PopoverInteractionKind,
  Position,
  Menu,
  MenuItem
} from '@blueprintjs/core'

import './ScraperToolbar.scss'

class ScraperToolbar extends Component {
  displayName: 'ScraperToolbar'
  propTypes: {
    loading: PropTypes.boolean,
    complete: PropTypes.boolean,
    dataOptionsToolbar: PropTypes.boolean,
    filtersToolbar: PropTypes.boolean,
    toggleDataOptionsToolbar: PropTypes.isRequired,
    toggleFiltersToolbar: PropTypes.func.isRequired,
    downloadCsv: PropTypes.func.isRequired
  }
  defaultProps: {
    loading: true,
    complete: false,
    dataOptionsToolbar: false,
    filtersToolbar: false
  }

  constructor (props) {
    super(props)

    this.renderDownloadMenu = this.renderDownloadMenu.bind(this)
    this.downloadCsv = this.downloadCsv.bind(this)
  }

  render () {
    const {
      loading,
      operationPending,
      dataOptionsToolbar,
      filtersToolbar,
      toggleDataOptionsToolbar,
      toggleFiltersToolbar
    } = this.props

    return (
      <Flex justify='space-around' className='scraper-toolbar-component'>
        <Box>
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
        </Box>
        <Box auto>
          {operationPending && this.renderSpinner()}
        </Box>
      </Flex>
    )
  }

  renderSpinner () {
    return (
      <div className='scraper-toolbar-spinner'>
        <Spinner className={`${Classes.SMALL}`} intent={Intent.PRIMARY} />
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
    this.props.downloadCsv()
  }

  downloadJson () {
    console.log('Download JSON')
  }
}

export default ScraperToolbar
