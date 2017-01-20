import React, { Component, PropTypes } from 'react'
import { Intent, ProgressBar } from '@blueprintjs/core'

import generateLoadingMessage from '../../../utils/loading-message'

import './ScrapeProgress.scss'

class ScrapeProgress extends Component {
  displayName: 'ScrapeProgress'
  propTypes: {
    totalCommentCount: PropTypes.number,
    commentsScraped: PropTypes.number,
    complete: PropTypes.boolean
  }
  defaultProps: {
    totalCommentCount: 0,
    commentsScraped: 0,
    complete: false
  }

  render () {
    const { totalCommentCount, commentsScraped, complete } = this.props
    const progress = !complete && totalCommentCount > 0 && commentsScraped > 0
      ? (commentsScraped / totalCommentCount)
      : null

    return (
      <div className='scrape-progress'>
        <ProgressBar
          className={complete && 'pt-no-stripes'}
          intent={complete ? Intent.SUCCESS : Intent.PRIMARY}
          value={progress} />

        <div className='progress-text'>
          {
            totalCommentCount > 0 && commentsScraped > 0 && !complete
            ? <span>Scraped <strong>{commentsScraped}</strong> of {totalCommentCount} comments</span>
            : complete ? <strong>Done!</strong> : <em>{generateLoadingMessage()}...</em>
          }
        </div>
      </div>
    )
  }
}

export default ScrapeProgress
