import React, { Component, PropTypes } from 'react'
import { Table, Column } from 'fixed-data-table'
import Measure from 'react-measure'

import SortHeaderCell from './SortHeaderCell'
import HeaderCell from './HeaderCell'
import IndexCell, { defaultWidth as indexColDefaultWidth } from './IndexCell'
import defaultColumns from './columns'
import './CommentTable.scss'

class CommentTable extends Component {
  displayName: 'CommentTable'
  propTypes: {
    comments: PropTypes.object.isRequired,
    replies: PropTypes.object.isRequired,
    resultEditor: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.renderColumn = this.renderColumn.bind(this)
    this.renderIndexColumn = this.renderIndexColumn.bind(this)
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
      { indexCol: indexColDefaultWidth })

    this.setState({ columnWidths })
  }

  render () {
    const { height, width } = this.state.dimensions
    const { resultEditor } = this.props
    const rows = resultEditor.get('rows')

    const activeColumns = defaultColumns
      .filter(c => resultEditor.getIn(['columns', c.key, 'display']))

    return (
      <Measure whitelist={['height', 'width']} onMeasure={this.setDimensions}>
        <div className='comment-table-wrapper'>
          <Table
            id='comment-table'
            width={width}
            height={height}
            rowsCount={rows.size}
            onColumnResizeEndCallback={this.onColumnResizeEnd}
            isColumnResizing={false}
            rowHeight={26}
            headerHeight={30}>

            {this.renderIndexColumn()}
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

    const { comments, replies, resultEditor } = this.props
    const { rows, repliesCollapsed } = resultEditor.toObject()

    const header = (c.id === 'index')
      ? (<Cell/>)
      : (
        <SortHeaderCell
          onSortChange={this.props.setColumnSortDir}
          sortDir={resultEditor.getIn(['columnSortDir', c.key])}>
          {c.name}
        </SortHeaderCell>
      )

    return (
      <Column
        fixed={c.fixed}
        key={c.key}
        columnKey={c.key}
        header={header}
        width={width}
        isResizable={c.resizable}
        cell={<c.cell data={{ comments, replies, rows, repliesCollapsed }} />} />
    )
  }

  renderIndexColumn () {
    const indexCol = this.state.columnWidths.indexCol
    const width = indexCol || indexColDefaultWidth
    return (
      <Column
        key='indexCol'
        columnKey='indexCol'
        header={<HeaderCell />}
        width={width}
        cell={<IndexCell />}
        isResizable
        fixed />
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

  onSortColumnChange (columnKey, nextSortDir) {
    this.props.actions.resultEditor.setColumnSortDir(columnKey, nextSortDir)
  }
}

export default CommentTable
