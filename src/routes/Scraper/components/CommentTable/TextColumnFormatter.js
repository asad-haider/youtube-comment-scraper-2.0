import React, { PropTypes } from 'react'
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core'

import './TextColumnFormatter.scss'

const TextColumnFormatter = ({ value }) => {
  const popoverContent = (
    <div className='text-column-popover'>
      <textarea readOnly>
        {value}
      </textarea>
    </div>
  )

  return (
    <Popover
      content={popoverContent}
      interactionKind={PopoverInteractionKind.CLICK}
      popoverClassName='pt-minimal'
      position={Position.BOTTOM_LEFT}
      useSmartPositioning>

      <div title={value}>{value}</div>

    </Popover>
  )
}

TextColumnFormatter.propTypes = {
  value: PropTypes.string
}

TextColumnFormatter.defaultProps = {
  value: ''
}

export default TextColumnFormatter
