import React, { PropTypes } from 'react'

const BooleanColumnFormatter = ({ value }) => (
  <div value={value}>
    {
      value === true
        ? 'yes'
        : value === false
        ? 'no'
        : ''
    }
  </div>
)

BooleanColumnFormatter.propTypes = {
  value: PropTypes.bool
}

BooleanColumnFormatter.defaultProps = {
  value: false
}

export default BooleanColumnFormatter
