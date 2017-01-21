import React from 'react'
import { Link } from 'react-router'
import PageLayout from '../../../layouts/PageLayout'
import ScraperForm from './ScraperForm'

import './HomeView.scss'

export const HomeView = () => (
  <PageLayout>
    <div className='page-cover'>
      <div className='page-cover-content container'>
        <h1>Scrape Comments from YouTube Videos</h1>
        <hr />
        <ScraperForm />
      </div>
    </div>
    <div className='home-view-content container'>
      <div className='row'>
        <div className='col-md-3 highlight-container'>
          <h1 className='highlight-icon pt-icon-tick' />
          <h2 className='highlight-title'>Complete</h2>
          <p className='highlight-text pt-running-text'>
            Download all comments from a given YouTube video, including replies.
            The scraper even includes the meta information for each comment,
            such as username, likes, approximate time and more.
          </p>
        </div>
          <div className='col-md-3 highlight-container'>
          <h1 className='highlight-icon pt-icon-user' />
          <h2 className='highlight-title'>Easy to use</h2>
          <p className='highlight-text pt-running-text'>
            Simply enter the URL of a YouTube video into the text field above
            and click <strong>Scrape</strong>. Once complete you can preview and
            modify your results before exporting them as JSON or CSV (for use with Excel).
          </p>
        </div>
          <div className='col-md-3 highlight-container'>
          <h1 className='highlight-icon pt-icon-heart' />
          <h2 className='highlight-title'>Free & Open</h2>
          <p className='highlight-text pt-running-text'>
            Not just free as in beer, but free as in Freedom! All of the source
            code is licensed under an open-source license and anyone is free to
            use or modify it. Check out the&nbsp;
            <a href="https://github.com/philbot9/youtube-comment-scraper-2.0" target='_blank'>
              GitHub repo
            </a>
            &nbsp;to find out more!
          </p>
        </div>
        <div className='col-md-3 highlight-container'>
          <h1 className='highlight-icon pt-icon-people' />
          <h2 className='highlight-title'>Share</h2>
          <p className='highlight-text pt-running-text'>
            Found this useful? Please spread the word so others can benefit,
            too! If you're interested in sharing your research check out
            the <Link to='/testimonials'>Testimonials</Link> and let us know how
            you've been using the scraper.
          </p>
        </div>
      </div>
    </div>
  </PageLayout>
)

export default HomeView
