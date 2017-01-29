import React from 'react'
import { Cell } from 'fixed-data-table'

const HeaderCell = ({ children, ...props }) => (
  <Cell {...props} className='comment-table-cell comment-table-header-cell'>
    {children}
  </Cell>
)

export default HeaderCell
