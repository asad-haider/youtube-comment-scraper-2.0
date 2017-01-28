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
    this.setHeight = this.setHeight.bind(this)

    this.indexColumn = {
      name: '',
      key: '_index',
      width: 50,
      resizable: true
    }

    this.state = {
      height: 0
    }
  }

  render () {
    const { height } = this.state
    const { comments, resultEditor } = this.props

    const activeColumns = defaultColumns
      .filter(c => resultEditor.getIn(['columns', c.key, 'display']))

    const columns = [ this.indexColumn ].concat(activeColumns)

    return (
      <Measure whitelist={['height']} onMeasure={this.setHeight}>
        <div className='comment-table-component'>
          <DataGrid
            columns={columns}
            minHeight={height}
            rowHeight={25}
            rowGetter={this.rowGetter}
            rowsCount={comments.size} />
        </div>
      </Measure>
    )
  }

  rowGetter (i) {
    return this.props.comments.get(i).set('_index', (i + 1))
  }

  setHeight ({ height }) {
    this.setState({ height })
  }
}

export default CommentTable
