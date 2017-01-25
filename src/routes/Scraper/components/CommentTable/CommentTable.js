import React, { Component, PropTypes } from 'react'
import DataGrid from 'react-data-grid'
import Measure from 'react-measure'
import { List } from 'immutable'

import defaultColumns from './columns'
import './CommentTable.scss'

class CommentTable extends Component {
  displayName: 'CommentTable'
  propTypes: {
    comments: PropTypes.object.isRequired,
    resultEditor: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.rowGetter = this.rowGetter.bind(this)

    this.state = {
      rows: List()
    }
  }

  componentWillReceiveProps (nextProps) {
    // if comments haven't changed dont' do anything
    if (!nextProps.comments || nextProps.comments === this.props.comments) {
      return
    }

    const rows = nextProps.comments.reduce((cs, c) =>
      cs.concat(this.flattenReplies(c)), List())

    this.setState({ rows })
  }

  render () {
    const { rows } = this.state
    const resultEditor = this.props.resultEditor.toObject()

    const columns = defaultColumns
      .filter(c => resultEditor.columns.get(c.key) && resultEditor.columns.get(c.key).get('active'))

    return (
      <Measure>
        {({ width, height }) => (
          <div className='comment-table-component'>
            <DataGrid
              columns={columns}
              minHeight={height}
              rowHeight={25}
              rowGetter={this.rowGetter}
              rowsCount={rows.size} />
          </div>
        )}
      </Measure>
    )
  }

  rowGetter (i) {
    return this.state.rows.get(i)
  }

  flattenReplies (c) {
    if (!c.get('hasReplies')) {
      return List.of(c)
    }

    const replies = c.get('replies').map(r => r.mapKeys(k => `reply_${k}`))
    return List.of(c).concat(replies)
  }
}

export default CommentTable
