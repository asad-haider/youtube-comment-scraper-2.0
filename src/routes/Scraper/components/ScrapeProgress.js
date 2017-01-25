import React, { Component, PropTypes } from 'react'
import { Intent, ProgressBar } from '@blueprintjs/core'
import { Flex, Box } from 'reflexbox'

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
      <Flex className='scrape-progress' align='center' justify='space-around'>
        <Box col={1}>
          {complete && this.renderDismissButton(dismiss)}
        </Box>

        <Box auto>
          <div className='scrape-progress-box container'>
            <ProgressBar
              className={complete && 'pt-no-stripes'}
              intent={complete ? Intent.SUCCESS : Intent.PRIMARY}
              value={progress} />

            <div className='progress-text'>
              {
                totalCommentCount > 0 && commentsScraped > 0 && !complete
                ? <span>Scraped <strong>{commentsScraped}</strong> of {totalCommentCount} comments</span>
                : complete ? <span>Scrape complete!</span> : <span>{this.state.loadingMessage}</span>
              }
            </div>
          </div>
        </Box>

        <Box col={1} />
      </Flex>
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
