import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import './Scraper.scss'

class Scraper extends Component {
  displayName: 'Scraper'
  propTypes: {
    videoId: PropTypes.string.isRequired,
    comments: PropTypes.object.isRequired,
    router: PropTypes.obect.isRequired,
    route: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      error: null,
      saved: false
    }

    this.confirmUnload = this.confirmUnload.bind(this)
  }

  componentDidMount () {
    const { videoId, route, router } = this.props

    if (this.validateVideoId(videoId)) {
      this.props.init()
      this.props.scrape(videoId)
    } else {
      this.setState({
        error: 'The provided video ID is invalid. Please try again.'
      })
    }

    router.setRouteLeaveHook(route, this.confirmUnload)
    window.addEventListener('beforeunload', this.confirmUnload)
  }

  componentWillUnmount () {
    this.props.resetScraper()
    window.removeEventListener('beforeunload', this.confirmUnload)
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

  render () {
    const { comments } = this.props

    if (!comments.size) {
      return <h3>Loading ...</h3>
    }

    return (
      <div className='container content-container'>
        <h1>Comments</h1>
        {comments.map(c =>
          <div><strong>{c.author}</strong> {c.text}</div>
        )}
      </div>
    )
  }
}

export default Scraper
