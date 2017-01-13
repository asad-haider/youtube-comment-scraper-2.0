import React from 'react'
import { IndexLink } from 'react-router'
import './PageNotFound.scss'

export const PageNotFound = () => (
  <div className='page-not-found container'>
    <div className="pt-non-ideal-state">
      <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
        <span className="pt-icon pt-icon-warning-sign"></span>
      </div>
      <h4 className="pt-non-ideal-state-title">Whoops, that page doesn't exist...</h4>
      <div className='pt-non-ideal-state-description'>
        <IndexLink to='/'>
          <button className='pt-button pt-button-large'>
            Back to Homepage
          </button>
        </IndexLink>
      </div>
    </div>
  </div>
)

export default PageNotFound
