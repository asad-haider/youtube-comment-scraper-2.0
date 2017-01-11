import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <nav className='pt-navbar pt-dark'>
    <div className='pt-navbar-group pt-align-left'>
      <div className='pt-navbar-heading'>Youtube Comment Scraper</div>
    </div>
  </nav>
)

// export const Header = () => (
//   <div>
//     <h1>React Redux Starter Kit</h1>
//     <IndexLink to='/' activeClassName='route--active'>
//       Home
//     </IndexLink>
//     {' · '}
//     <Link to='/counter' activeClassName='route--active'>
//       Counter
//     </Link>
//   </div>
// )

export default Header
