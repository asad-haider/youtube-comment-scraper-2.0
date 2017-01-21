import React, { Component, PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'
import { Collapse } from '@blueprintjs/core'
import moment from 'moment'
import './VideoInfo.scss'

class VideoInfo extends Component {
  displayName: 'VideoInfo'
  propTypes: {
    videoInfo: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.renderCollapseButton = this.renderCollapseButton.bind(this)
    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.renderVideoInfo = this.renderVideoInfo.bind(this)
    this.toggleExpandDescription = this.toggleExpandDescription.bind(this)

    this.state = {
      collapsed: true
    }
  }

  render () {
    const { videoInfo } = this.props
    const { collapsed } = this.state

    return (
      <div className='video-info-container'>
        <Flex className='video-title-container'>
          <Box>
            {this.renderCollapseButton()}
          </Box>
          <Box auto>
            {videoInfo ? this.renderTitle(videoInfo) : this.renderSkeletonTitle()}
          </Box>
        </Flex>
        <Collapse isOpen={!collapsed}>
          {videoInfo ? this.renderVideoInfo() : this.renderSkeletonContent()}
        </Collapse>
      </div>
    )
  }

  renderSkeletonTitle () {
    return (
      <h4 className='pt-skeleton video-title'>Video title skeleton</h4>
    )
  }

  renderTitle (videoInfo) {
    return (
      <h4 className='video-title'>
        <a target='_blank' href={`https://www.youtube.com/watch?v=${videoInfo.get('videoId')}`}>
          {videoInfo.get('title')}
        </a>
      </h4>
    )
  }

  renderCollapseButton () {
    const { collapsed } = this.state
    const chevronClass = collapsed ? 'pt-icon-chevron-down' : 'pt-icon-chevron-up'
    return (
      <button
        className={`pt-button pt-minimal ${chevronClass}`}
        onClick={this.toggleCollapse} />
    )
  }

  toggleCollapse () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  renderVideoInfo () {
    const { videoInfo } = this.props

    return (
      <Flex className='video-details' justify='flex-start' style={{ width: '100%' }}>
        <Box className='video-info-box' auto>

          <p className='video-info-item'>
            Published by&nbsp;
            {videoInfo.get('channelId')
              ? <a
                  href={`https://www.youtube.com/channel/${videoInfo.get('channelId')}`}
                  target='_blank'>
                        {videoInfo.get('owner')}
                  </a>
              : videoInfo.get('owner')}
            &nbsp;on {moment(videoInfo.get('datePublished', 'YYYY-MM-DD')).format('MMM Do YYYY')}
          </p>

          <p className='video-info-item'>
            <strong>
              {videoInfo.get('views').toLocaleString()}
            </strong>
            &nbsp;Views &bull;&nbsp;
            <strong>
              {videoInfo.get('commentCount').toLocaleString()}
            </strong>
            &nbsp;Comments
          </p>

          <p className='video-description'>
            <div
              className='video-description-html'
              dangerouslySetInnerHTML={{ __html: videoInfo.get('description') }} />
          </p>
        </Box>

        <Box className='video-thumb-box'>
          <img className='video-thumb' src={videoInfo.get('thumbnailUrl')} />
        </Box>
      </Flex>
    )
  }

  renderSkeletonContent () {
    return (
      <Flex className='video-details' justify='flex-start' style={{ width: '100%' }}>
        <Box className='video-info-box' auto>
          <p className='video-info-item pt-skeleton'>Lorem ipsum dolor sit amet</p>
          <p className='video-info-item pt-skeleton'>Lorem ipsum dolor sit amet</p>
          <p className='video-description pt-skeleton'>
            Lorem ipsum dolor sit amet<br/>
            Lorem ipsum dolor sit amet<br/>
            Lorem ipsum dolor sit amet<br/>
            Lorem ipsum dolor sit amet<br/>
          </p>
        </Box>
        <Box className='video-thumb-box'>
          <div className='video-thumb pt-skeleton' />
        </Box>

      </Flex>
    )
  }

  toggleExpandDescription (e) {
    e.preventDefault()
    const { descriptionExpanded } = this.state
    this.setState({
      descriptionExpanded: !descriptionExpanded
    })
  }
}

export default VideoInfo
