import React, { Component, PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'
import moment from 'moment'
import './VideoInfo.scss'

class VideoInfo extends Component {
  displayName: 'VideoInfo'
  propTypes: {
    videoInfo: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.toggleCollapse = this.toggleCollapse.bind(this)
    this.renderVideoInfo = this.renderVideoInfo.bind(this)
    this.renderTitle = this.renderTitle.bind(this)

    this.state = {
      collapsed: true
    }
  }

  render () {
    const { videoInfo } = this.props
    const { collapsed } = this.state

    return (
      <div className='video-info'>
        <div className='video-title-container'>
          {videoInfo ? this.renderTitle(videoInfo) : this.renderSkeletonTitle()}
        </div>
        {!collapsed &&
          (videoInfo ? this.renderVideoInfo() : this.renderSkeletonContent())
        }
      </div>
    )
  }

  renderSkeletonTitle () {
    return (
      <h4 className='pt-skeleton video-title'>Video title skeleton</h4>
    )
  }

  renderTitle (videoInfo) {
    const { collapsed } = this.state
    const chevronClass = collapsed ? 'pt-icon-chevron-down' : 'pt-icon-chevron-up'
    return (
      <h4 className='video-title' onClick={this.toggleCollapse}>
        <span className={`expand-info-button ${chevronClass}`} />
        <a>
          {videoInfo.get('title')}
        </a>
      </h4>
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
        <Box className='video-thumb-box'>
          <a target='_blank' href={`https://www.youtube.com/watch?v=${videoInfo.get('videoId')}`}>
            <img className='video-thumb' src={videoInfo.get('thumbnailUrl')} />
          </a>
        </Box>

        <Box className='video-info-box' auto>

          <p className='video-info-item'>
            Published by&nbsp;
            {videoInfo.get('channelId')
              ? <a href={`https://www.youtube.com/channel/${videoInfo.get('channelId')}`}
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

          <hr />

          <div
            className='video-description-html'
            dangerouslySetInnerHTML={{ __html: videoInfo.get('description') }} />

        </Box>
      </Flex>
    )
  }

  renderSkeletonContent () {
    return (
      <Flex className='video-details' justify='flex-start' style={{ width: '100%' }}>
        <Box className='video-thumb-box'>
          <div className='video-thumb pt-skeleton' />
        </Box>

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
      </Flex>
    )
  }
}

export default VideoInfo
