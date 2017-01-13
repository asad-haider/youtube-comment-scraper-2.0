import React from 'react'
import './Footer.scss'

const Footer = () => {
  const year = (new Date()).getFullYear()
  return (
    <div className='footer container'>
      <hr />
      <a className='small' href='http://philip.klostermann.ca' target='_blank'>
        &copy; {year} Philip Klostermann
      </a>
    </div>
  )
}

module.exports = Footer
