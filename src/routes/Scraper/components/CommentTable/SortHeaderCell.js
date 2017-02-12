import React, { Component, PropTypes } from 'react'
import HeaderCell from './HeaderCell'
import omit from 'lodash/omit'
import { SortDir } from '../../redux/resultEditor'

class SortHeaderCell extends Component {
  propTypes: {
    sortDir: PropTypes.string,
    onSortChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onSortChange = this.onSortChange.bind(this)
  }

  render () {
    var { sortDir, children, ...props } = this.props
    return (
      <HeaderCell {...omit(props, 'onSortChange')}>
        <a onClick={this.onSortChange}>
          {children} {this.getSortDirIcon(sortDir)}
        </a>
      </HeaderCell>
    )
  }

  onSortChange (e) {
    e.preventDefault()

    this.props.onSortChange(
      this.props.columnKey,
      this.getNextSortDir(this.props.sortDir))
  }

  getNextSortDir (currentSortDir) {
    switch (currentSortDir) {
      case SortDir.DESC:
        return SortDir.ASC
      case SortDir.ASC:
        return null
      default:
        return SortDir.DESC
    }
  }

  getSortDirIcon (sortDir) {
    switch (sortDir) {
      case SortDir.DESC:
        return <span className='pt-icon-default pt-icon-chevron-down' />
      case SortDir.ASC:
        return <span className='pt-icon-default pt-icon-chevron-up' />
      default:
        return <span />
    }
  }
}

export default SortHeaderCell
