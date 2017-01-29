import React from 'react'
import { Cell } from 'fixed-data-table'

import './Cell.scss'
import './HeaderCell.scss'

const HeaderCell = ({ children, ...props }) => (
  <Cell {...props} className='comment-table-cell comment-table-header-cell'>
    {children}
  </Cell>
)

export default HeaderCell
