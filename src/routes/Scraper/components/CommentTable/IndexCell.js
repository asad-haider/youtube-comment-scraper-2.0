import React from 'react'
import { Cell } from 'fixed-data-table'

import './Cell.scss'
import './IndexCell.scss'

const DefaultCell = ({ rowIndex, ...props }) => (
  <Cell {...props} className='comment-table-cell comment-table-index-cell'>
    { rowIndex + 1 }
  </Cell>
)

export const defaultWidth = 30
export default DefaultCell
