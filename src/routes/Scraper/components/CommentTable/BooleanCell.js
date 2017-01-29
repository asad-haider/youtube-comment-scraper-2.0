import React from 'react'
import { Cell } from 'fixed-data-table'

import './Cell.scss'

const BooleanCell = ({ rowIndex, data, columnKey, ...props }) => {
  const value = data.get(rowIndex).get(columnKey)
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
