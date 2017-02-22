import React, { Component, PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'
import './Scraper.scss'

import ScraperHeader from './ScraperHeader'
import ScrapeProgress from './ScrapeProgress'
import ScraperToolbar from './ScraperToolbar'
import DataToolbar from './DataToolbar'
import FiltersToolbar from './FiltersToolbar'
import CommentTable from './CommentTable'

class Scraper extends Component {
  displayName: 'Scraper'
  propTypes: {
    videoId: PropTypes.string.isRequired,
    comments: PropTypes.object.isRequired,
    replies: PropTypes.object.isRequired,
    resultEditor: PropTypes.object.isRequired,
    scraper: PropTypes.object.isRequired,
    videoInfo: PropTypes.object.isRequired,
    router: PropTypes.obect.isRequired,
    route: PropTypes.string.isRequired,
    rows: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      error: null,
      saved: false,
      removeRouteLeaveHook: () => {},
      progressDismissed: false,
      dataOptionsToolbarIsOpen: false,
      filtersToolbarIsOpen: false
    }

    this.confirmUnload = this.confirmUnload.bind(this)
    this.dismissProgress = this.dismissProgress.bind(this)
    this.toggleDataOptionsToolbar = this.toggleDataOptionsToolbar.bind(this)
    this.toggleFiltersToolbar = this.toggleFiltersToolbar.bind(this)
  }

  componentDidMount () {
    const { route, router, videoId } = this.props

    if (this.validateVideoId(videoId)) {
      // console.warn('Halting the scraper for now!')
      this.props.actions.scraper.scrape(videoId)
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
    this.props.actions.scraper.resetScraper()
    this.state.removeRouteLeaveHook()
    window.removeEventListener('beforeunload', this.confirmUnload)
  }

  render () {
    const { comments, rows, replies, resultEditor, scraper, videoInfo, actions } = this.props
    const { progressDismissed, dataOptionsToolbarIsOpen, filtersToolbarIsOpen } = this.state

    const loading = Boolean(videoInfo)
    const progress = {
      totalCommentCount: videoInfo ? videoInfo.get('commentCount') : 0,
      commentsScraped: comments.size,
      complete: scraper.get('complete')
    }

    return (
      <Flex column className='scraper-component'>
        <Box className='scraper-header-container'>
          <ScraperHeader videoInfo={videoInfo} />
        </Box>

        <Box className='ui-component scraper-toolbar-container'>
          <ScraperToolbar
            operationPending={resultEditor.get('operationPending')}
            loading={loading}
            complete={scraper.get('complete')}
            dataOptionsToolbar={dataOptionsToolbarIsOpen}
            filtersToolbar={filtersToolbarIsOpen}
            toggleDataOptionsToolbar={this.toggleDataOptionsToolbar}
            toggleFiltersToolbar={this.toggleFiltersToolbar}
            downloadCsv={actions.scraper.downloadCsv}
            downloadJson={actions.scraper.downloadJson} />
        </Box>

        {dataOptionsToolbarIsOpen &&
          <Box className='ui-component comment-table-container'>
            <DataToolbar
              loading={loading}
              resultEditor={resultEditor}
              toggleColumn={actions.resultEditor.toggleColumn}
              setIncludeReplies={actions.resultEditor.setIncludeReplies}
              setRepliesCollapsed={actions.resultEditor.setRepliesCollapsed} />
          </Box>
        }

        {filtersToolbarIsOpen &&
          <Box className='ui-component comment-table-container'>
            <FiltersToolbar loading={loading} />
          </Box>
        }

        {!progressDismissed &&
          <Box className='ui-component scrape-progress-container'>
            <ScrapeProgress {...progress} dismiss={this.dismissProgress} />
          </Box>
        }

        <Box className='ui-component comment-table-container' auto>
          <CommentTable
            rows={rows}
            replies={replies}
            resultEditor={resultEditor}
            setColumnSortDir={actions.resultEditor.setColumnSortDir} />
        </Box>
      </Flex>
    )
  }

  dismissProgress () {
    this.setState({
      progressDismissed: true
    })
  }

  toggleDataOptionsToolbar () {
    this.setState({
      dataOptionsToolbarIsOpen: !this.state.dataOptionsToolbarIsOpen
    })
  }

  toggleFiltersToolbar () {
    this.setState({
      filtersToolbarIsOpen: !this.state.filtersToolbarIsOpen
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
