import React, { Component } from 'react'
import { Cell } from 'fixed-data-table'
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'

import './Cell.scss'
import './TextCell.scss'

const DefaultCell = ({ rowIndex, data, columnKey, ...props }) => {
  const value = data.get(rowIndex).get(columnKey)

  const popoverContent = (
    <div className='text-column-popover'>
      <textarea readOnly>
        {value}
      </textarea>
    </div>
  )

  return (
    <Cell {...props} className='comment-table-cell'>
      <Popover
        content={popoverContent}
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName='pt-minimal'
        position={Position.BOTTOM_LEFT}
        useSmartPositioning>

        <div title={value}>{value}</div>

      </Popover>
    </Cell>
  )
}

export default DefaultCell
