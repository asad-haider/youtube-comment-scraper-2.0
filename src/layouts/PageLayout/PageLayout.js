import React, { PropTypes } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const PageLayout = ({ children }) => {
  return (
    <div className='page-layout'>
      <Header />
      <div className='page-content'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default PageLayout
