import React from 'react'
import { Cell } from 'fixed-data-table'
import resolveCellValue from './resolve-cell-value'

import './Cell.scss'

const DefaultCell = ({ rowIndex, data, columnKey, ...props }) => (
  <Cell {...props} className='comment-table-cell'>
    {resolveCellValue({ data, rowIndex, columnKey })}
  </Cell>
)

export default DefaultCell
