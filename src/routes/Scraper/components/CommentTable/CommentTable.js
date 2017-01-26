import React, { Component, PropTypes } from 'react'
import DataGrid from 'react-data-grid'
import Measure from 'react-measure'
import { List } from 'immutable'

import defaultColumns from './columns'
import './CommentTable.scss'

const indexColumn = {
  name: '',
  key: '_index',
  width: 40,
  resizable: true
}

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
    const needToRecomputeComments = (
      nextProps.comments !== this.props.comments ||
      nextProps.resultEditor.get('replies') !== this.props.resultEditor.get('replies') ||
      nextProps.resultEditor.get('collapsedReplies') !== this.props.resultEditor.get('collapsedReplies')
    )

    if (!needToRecomputeComments) {
      return
    }

    let comments
    if (!nextProps.resultEditor.get('replies')) {
      comments = nextProps.comments
    } else if (!nextProps.resultEditor.get('collapsedReplies')) {
      comments = nextProps.comments
        .reduce((cs, c) => cs.concat(this.flattenReplies(c)), List())
    } else {
      comments = nextProps.comments
        .reduce((cs, c) => cs.concat(this.collapseReplies(c)), List())
    }

    const rows = comments
      .map((c, i) => c.set('_index', (i + 1)))

    this.setState({ rows })
  }

  render () {
    const { rows } = this.state
    const resultEditor = this.props.resultEditor.toObject()

    const activeColumns = defaultColumns
      .filter(c => resultEditor.columns.get(c.key) && resultEditor.columns.get(c.key).get('active'))

    const columns = [indexColumn].concat(activeColumns)

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

  collapseReplies (c) {
    return (!c.get('hasReplies'))
      ? List.of(c)
      : List.of(c).concat(c.get('replies'))
  }
}

export default CommentTable
