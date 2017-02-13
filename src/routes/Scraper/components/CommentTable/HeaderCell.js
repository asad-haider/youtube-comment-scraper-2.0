import React from 'react'
import { Cell } from 'fixed-data-table'

import './Cell.scss'
import './HeaderCell.scss'

const HeaderCell = ({ children, ...props }) => {
  const classes = [
    props.className,
    'comment-table-cell',
    'comment-table-header-cell'
  ].filter(Boolean).join(' ')

  return (
    <Cell {...props} className={classes}>
      {children}
    </Cell>
  )
}

export default HeaderCell
