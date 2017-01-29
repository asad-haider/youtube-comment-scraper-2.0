import React from 'react'
import { Cell } from 'fixed-data-table'

import './Cell.scss'

const DefaultCeall = ({ rowIndex, data, columnKey, ...props }) => (
  <Cell {...props} className='comment-table-cell'>
    {data.get(rowIndex).get(columnKey)}
  </Cell>
)

export default DefaultCeall
