import React from 'react'
import { IndexLink } from 'react-router'
import PageLayout from '../../../layouts/PageLayout'
import './PageNotFound.scss'

export const PageNotFound = () => (
  <PageLayout>
    <div className='pt-non-ideal-state content-container'>
      <div className='pt-non-ideal-state-visual pt-non-ideal-state-icon'>
        <span className='pt-icon pt-icon-warning-sign' />
      </div>
      <h4 className='pt-non-ideal-state-title'>Whoops, that page doesn't exist...</h4>
      <div className='pt-non-ideal-state-description'>
        <IndexLink to='/'>
          <button className='pt-button pt-button-large'>
            Back to Homepage
          </button>
        </IndexLink>
      </div>
    </div>
  </PageLayout>
)

export default PageNotFound
