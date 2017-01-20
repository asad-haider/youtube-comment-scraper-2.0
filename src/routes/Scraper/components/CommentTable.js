import React, { Component, PropTypes } from 'react'
import { List } from 'immutable'
import { Table, Column, Cell } from '@blueprintjs/table'

import './CommentTable.scss'

class CommentTable extends Component {
  displayName: 'CommentTable'
  propTypes: {
    comments: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.renderCell = this.renderCell.bind(this)

    this.state = {
      columnMapping: {
        0: 'id',
        1: 'author',
        2: 'text'
      }
    }
  }

  render () {
    const { comments } = this.props
    const numRows = comments.size > 25 ? comments.size : 25

    return (
      <div className='comment-table-container'>
        <Table className='comment-table' numRows={numRows}>
          <Column name='id' renderCell={comments.size ? this.renderCell : this.renderLoadingCell} />
          <Column name='author' renderCell={comments.size ? this.renderCell : this.renderLoadingCell} />
          <Column name='text' renderCell={comments.size ? this.renderCell : this.renderLoadingCell} />
        </Table>
      </div>
    )
  }

  renderCell (row, col) {
    const { comments } = this.props
    const { columnMapping } = this.state

    return (row >= comments.size)
      ? <Cell />
      : <Cell>{comments.get(row).get(columnMapping[col])}</Cell>
  }

  renderLoadingCell () {
    return <Cell loading='Lorem ipsum dolor'>Lorem ipsum dolor</Cell>
  }
}

export default CommentTable
