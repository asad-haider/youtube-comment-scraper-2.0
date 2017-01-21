import React, { Component, PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'
import './Scraper.scss'

import ScraperHeader from './ScraperHeader'
import ScrapeProgress from './ScrapeProgress'
import CommentTable from './CommentTable'

class Scraper extends Component {
  displayName: 'Scraper'
  propTypes: {
    videoId: PropTypes.string.isRequired,
    scraper: PropTypes.object.isRequired,
    router: PropTypes.obect.isRequired,
    route: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      error: null,
      saved: false,
      removeRouteLeaveHook: () => {},
      progressDismissed: false
    }

    this.confirmUnload = this.confirmUnload.bind(this)
    this.dismissProgress = this.dismissProgress.bind(this)
  }

  componentDidMount () {
    const { route, router, videoId } = this.props

    if (this.validateVideoId(videoId)) {
      // console.warn('Halting the scraper for now!')
      this.props.init()
      this.props.scrape(videoId)
    } else {
      this.setState({
        error: 'The provided video ID is invalid. Please try again.'
      })
    }

    window.addEventListener('beforeunload', this.confirmUnload)
    this.setState({
      removeRouteLeaveHook: router.setRouteLeaveHook(route, this.confirmUnload)
    })
  }

  componentWillUnmount () {
    this.props.resetScraper()
    this.state.removeRouteLeaveHook()
    window.removeEventListener('beforeunload', this.confirmUnload)
  }

  render () {
    const { comments, videoInfo, complete } = this.props.scraper.toObject()
    const { progressDismissed } = this.state
    const progress = {
      totalCommentCount: videoInfo ? videoInfo.get('commentCount') : 0,
      commentsScraped: comments.size,
      complete
    }

    return (
      <Flex column className='scraper-component'>
        <Box className='scraper-header-container'>
          <ScraperHeader videoInfo={videoInfo} />
        </Box>
        {!progressDismissed &&
          <Box className='scrape-progress-container'>
            <ScrapeProgress {...progress} dismiss={this.dismissProgress} />
          </Box>
        }
        <Box className='comment-table-container' auto>
          <CommentTable comments={comments} />
        </Box>
      </Flex>
    )
  }

  dismissProgress () {
    this.setState({
      progressDismissed: true
    })
  }

  confirmUnload (e) {
    if (!this.state.error && !this.state.saved) {
      const msg = 'The current progress of your scrape will be lost. Are you sure you want to leave?'
      if (e && e.preventDefault) {
        e.preventDefault()
        e.returnValue = msg
      }
      return msg
    }
  }

  validateVideoId (videoId) {
    return /^[\w_-]{11}$/.test(videoId)
  }
}

export default Scraper
