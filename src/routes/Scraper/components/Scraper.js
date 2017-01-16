import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import './Scraper.scss'

class Scraper extends Component {
  displayName: 'Scraper'
  propTypes: {
    videoId: PropTypes.string.isRequired,
    comments: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { error: null }
  }

  componentDidMount () {
    const { videoId } = this.props
    if (this.validateVideoId(videoId)) {
      this.props.init()
      this.props.scrape(videoId)
    } else {
      this.setState({
        error: 'The provided video ID is invalid. Please try again.'
      })
    }
  }

  componentWillUnmount () {
    this.props.close()
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
          <p><strong>{c.author}</strong> {c.text}</p>
        )}
      </div>
    )
  }
}

export default Scraper
