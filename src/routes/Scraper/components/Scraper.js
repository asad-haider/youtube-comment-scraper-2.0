import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import './Scraper.scss'

class Scraper extends Component {
  displayName: 'Scraper'
  propTypes: {
    videoId: PropTypes.string.isRequired
  }

  constructor () {
    this.state = {
      error: null
    }
  }

  componentDidMount () {
    const { videoId } = this.props

    if (this.validateVideoId(videoId)) {
      console.log('VALID', videoId)
    } else {
      this.setState({
        error: 'The provided video ID is invalid. Please try again.'
      })
    }
  }

  validateVideoId (videoId) {
    return /^[\w_-]{11}$/.test(videoId)
  }

  render () {
    return (
      <div className='container content-container'>
        <h1>Scrape {this.props.videoId}</h1>
      </div>
    )
  }
}

export default Scraper
