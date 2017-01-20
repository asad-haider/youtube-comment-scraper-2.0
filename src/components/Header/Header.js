import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <nav className='pt-navbar pt-dark'>
    <div className='container'>
      <div className='pt-navbar-group pt-align-left'>
        <IndexLink className='navbar-heading-link' to='/'>
          <div className='pt-navbar-heading'>YouTube Comment Scraper</div>
        </IndexLink>
      </div>
      <div className='pt-navbar-group pt-align-right'>
        <IndexLink to='/' activeClassName='active-route'>
          <button className='pt-button pt-minimal pt-icon-home'>Home</button>
        </IndexLink>
        <Link activeClassName='active-route' to='/stats'>
          <button className='pt-button pt-minimal pt-icon-timeline-bar-chart'>Stats</button>
        </Link>
        <Link activeClassName='active-route' to='/testimonials'>
          <button className='pt-button pt-minimal pt-icon-comment'>Testimonials</button>
        </Link>
        <a href='https://github.com/philbot9/youtube-comment-scraper-2.0' target='_blank'>
          <button className='pt-button pt-minimal pt-icon-code'>Code</button>
        </a>
      </div>
    </div>
  </nav>
)

export default Header
