import React from 'react'
import { Cell } from 'fixed-data-table'
import resolveCellValue from './resolve-cell-value'

import './Cell.scss'

const BooleanCell = ({ rowIndex, data, columnKey, ...props }) => {
  const value = resolveCellValue({ data, rowIndex, columnKey })
  const text = (typeof value !== 'boolean')
    ? ''
    : (value === true)
    ? 'yes'
    : 'no'

  return (
    <Cell {...props} className='comment-table-cell'>
      {text}
    </Cell>
  )
}

export default BooleanCell
