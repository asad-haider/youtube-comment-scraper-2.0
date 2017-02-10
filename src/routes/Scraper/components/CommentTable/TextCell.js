import React from 'react'
import { Cell } from 'fixed-data-table'
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'
import resolveCellValue from './resolve-cell-value'

import './Cell.scss'
import './TextCell.scss'

const DefaultCell = ({ rowIndex, data, columnKey, ...props }) => {
  const value = resolveCellValue({ data, rowIndex, columnKey })

  const popoverContent = (
    <div className='text-column-popover'>
      <textarea value={value} readOnly />
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
