import React, { Component, PropTypes } from 'react'
import DataGrid from 'react-data-grid'
import Measure from 'react-measure'

// import { Table, Column, Cell } from 'fixed-data-table'

import './CommentTable.scss'

const columns = [
  {
    key: 'id',
    name: 'ID',
    width: 250,
    resizable : true
  },
  {
    key: 'author',
    name: 'Author',
    width: 150,
    resizable : true
  },
  {
    key: 'authorLink',
    name: 'Author Link',
    width: 150,
    resizable : true
  },
  {
    key: 'authorThumb',
    name: 'Author Thumb',
    width: 150,
    resizable : true
  },
  {
    key: 'text',
    name: 'Text',
    width: 300,
    resizable : true
  },
  {
    key: 'likes',
    name: 'Likes',
    width: 50,
    resizable : true
  },
  {
    key: 'time',
    name: 'Time',
    width: 130,
    resizable : true
  },
  {
    key: 'timestamp',
    name: 'Timestamp',
    width: 120,
    resizable : true
  },
  {
    key: 'hasReplies',
    name: 'Has Replies',
    width: 150,
    resizable : true
  }
]

class CommentTable extends Component {
  displayName: 'CommentTable'
  propTypes: {
    comments: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.rowGetter = this.rowGetter.bind(this)

    this.state = {
      columnMapping: {}
    }
  }

  render () {
    const { comments } = this.props

    return (
      <Measure>
        {({ width, height }) => (
          <div className='comment-table-component'>
            <DataGrid
              columns={columns}
              minHeight={height}
              rowHeight={25}
              rowGetter={this.rowGetter}
              rowsCount={comments.size} />
          </div>
        )}
      </Measure>
    )
  }

  rowGetter (i) {
    return this.props.comments.get(i)
  }
}

export default CommentTable
