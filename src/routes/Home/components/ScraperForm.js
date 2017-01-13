import React, { Component } from 'react'
import { Popover, Position, Intent } from '@blueprintjs/core'
import './ScraperForm.scss'

class ScraperForm extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onVideoUrlChanged = this.onVideoUrlChanged.bind(this)
    this.onCloseFormPopover = this.onCloseFormPopover.bind(this)

    this.state = {
      videoUrl: '',
      videoId: null,
      hasError: false
    }
  }

  onSubmit (e) {
    e.preventDefault()
    const { videoId } = this.state

    if (!videoId) {
      this.setState({ hasError: true })
    } else {
      console.log('SUBMITTING!')
    }
  }

  onVideoUrlChanged (e) {
    const videoUrl = e.target.value
    this.setState({
      videoId: this.extractVideoID(videoUrl),
      videoUrl
    })
  }

  onCloseFormPopover () {
    this.setState({ hasError: false })
  }

  extractVideoID (url) {
    const m1 = /(?:http[s]?:\/\/)?(?:www\.)?youtube\.\w{2,3}\/watch\?.*?v=([^&]+)&?/i.exec(url)
    if (m1 && m1.length === 2 && m1[1].length === 11) {
      return m1[1]
    }

    const m2 = /(?:http[s]?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)\??/i.exec(url)
    if (m2 && m2.length === 2 && m2[1].length === 11) {
      return m2[1]
    }

    return null
  }

  render () {
    const { videoUrl, videoId, hasError } = this.state

    return (
      <div className='scraper-form-container'>
        <form onSubmit={this.onSubmit}>
          <Popover
            className='form-popover'
            content={hasError ? this.renderErrorPopover() : ''}
            isOpen={hasError}
            position={Position.BOTTOM}
            onClose={this.onCloseFormPopover}>

            <div className='pt-input-group pt-large pt-fill'>
              <span className='pt-icon pt-icon-video' />
              <input
                value={videoUrl}
                onChange={this.onVideoUrlChanged}
                name='videoUrl'
                type='text'
                className='pt-input'
                placeholder='Youtube Video URL' />

              <button type='submit' className={`pt-button pt-large ${videoId ? 'pt-intent-success' : ''}`}>
                Scrape
                <span className='pt-icon-standard pt-icon-arrow-right pt-align-right' />
              </button>
            </div>

          </Popover>
        </form>
      </div>
    )
  }

  renderErrorPopover () {
    return (
      <div className='form-popover-content'>
          <strong>Please enter a valid Youtube Video URL.</strong>
      </div>
    )
  }
}

module.exports = ScraperForm
