import React, { Component, PropTypes } from 'react'
import { Intent, ProgressBar } from '@blueprintjs/core'

import generateLoadingMessage from '../../../utils/loading-message'

import './ScrapeProgress.scss'

class ScrapeProgress extends Component {
  displayName: 'ScrapeProgress'
  propTypes: {
    totalCommentCount: PropTypes.number,
    commentsScraped: PropTypes.number,
    complete: PropTypes.boolean,
    dismiss: PropTypes.func
  }
  defaultProps: {
    totalCommentCount: 0,
    commentsScraped: 0,
    complete: false,
    dismiss: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      loadingMessage: generateLoadingMessage()
    }
  }

  render () {
    const { totalCommentCount, commentsScraped, complete, dismiss } = this.props
    const progress = !complete && totalCommentCount > 0 && commentsScraped > 0
      ? (commentsScraped / totalCommentCount)
      : null

    return (
      <div className='scrape-progress'>
        {complete && this.renderDismissButton(dismiss)}
        <div className='scrape-progress-box container'>
          <div className='progress-text'>
            {
              totalCommentCount > 0 && commentsScraped > 0 && !complete
              ? <span>Scraped <strong>{commentsScraped}</strong> of {totalCommentCount} comments</span>
              : complete ? <span>Scrape complete!</span> : <span>{this.state.loadingMessage}</span>
            }
          </div>

          <ProgressBar
            className={complete && 'pt-no-stripes'}
            intent={complete ? Intent.SUCCESS : Intent.PRIMARY}
            value={progress} />
        </div>
      </div>
    )
  }

  renderDismissButton (dismiss) {
    return (
      <div className='dismiss-button-container'>
        <button onClick={dismiss} className='pt-button pt-minimal pt-icon-cross' />
      </div>
    )
  }
}

export default ScrapeProgress
