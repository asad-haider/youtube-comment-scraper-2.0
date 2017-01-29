import React, { Component, PropTypes } from 'react'
import { Table, Column, Cell } from 'fixed-data-table'
import Measure from 'react-measure'
import { List } from 'immutable'

import HeaderCell from './HeaderCell'
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
    this.renderColumn = this.renderColumn.bind(this)
    this.setDimensions = this.setDimensions.bind(this)

    this.state = {
      dimensions: { height: 0, width: 0 }
    }
  }

  render () {
    const { height, width } = this.state.dimensions
    const { comments, resultEditor } = this.props

    const activeColumns = defaultColumns
      .filter(c => resultEditor.getIn(['columns', c.key, 'display']))

    return (
      <Measure whitelist={['height']} onMeasure={this.setDimensions}>
        <div className='comment-table-wrapper'>
          <Table
            id='comment-table'
            width={width}
            height={height}
            rowsCount={comments.size}
            rowHeight={26}
            headerHeight={30}>

            {activeColumns.map(this.renderColumn)}

          </Table>
        </div>
      </Measure>
    )
  }

  renderColumn (c) {
    return (
      <Column
        key={c.key}
        columnKey={c.key}
        header={<HeaderCell>{c.name}</HeaderCell>}
        width={c.width}
        isResizable={c.resizable}
        cell={c.cell ? <c.cell data={this.props.comments} /> : <TextCell data={this.props.comments} />} />
    )
  }

  setDimensions ({ height, width }) {
    this.setState({
      dimensions: { height, width }
    })
  }
}

export default CommentTable
