import React, { Component, PropTypes } from 'react'
import { Table, Column } from 'fixed-data-table'
import Measure from 'react-measure'
import { List } from 'immutable'

import HeaderCell, { SortTypes } from './HeaderCell'
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
    this.onColumnResizeEnd = this.onColumnResizeEnd.bind(this)

    this.state = {
      columnWidths: {},
      dimensions: { height: 0, width: 0 }
    }
  }

  componentDidMount () {
    // import default column widths
    const columnWidths = defaultColumns.reduce(
      (cws, c) => ({ ...cws, [c.key]: c.width }),
      {})

    this.setState({ columnWidths })
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
            onColumnResizeEndCallback={this.onColumnResizeEnd}
            isColumnResizing={false}
            rowHeight={26}
            headerHeight={30}>

            {activeColumns.map(this.renderColumn)}

          </Table>
        </div>
      </Measure>
    )
  }

  renderColumn (c) {
    let width
    if (!this.state.columnWidths[c.key]) {
      const col = defaultColumns.find(col => col.key === c.key)
      if (col) {
        width = col.width
      }
    } else {
      width = this.state.columnWidths[c.key]
    }

    return (
      <Column
        key={c.key}
        columnKey={c.key}
        header={<HeaderCell>{c.name}</HeaderCell>}
        width={width}
        isResizable={c.resizable}
        cell={<c.cell data={this.props.comments} />} />
    )
  }

  onColumnResizeEnd (newColumnWidth, columnKey) {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth
      }
    }))
  }

  setDimensions ({ height, width }) {
    this.setState({
      dimensions: { height, width }
    })
  }
}

export default CommentTable
