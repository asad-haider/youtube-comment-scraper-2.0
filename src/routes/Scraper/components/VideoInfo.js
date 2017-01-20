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
    this.renderVideoInfo = this.renderVideoInfo.bind(this)
    this.toggleExpandDescription = this.toggleExpandDescription.bind(this)

    this.state = {
      descriptionExpanded: false
    }
  }

  render () {
    const { videoInfo } = this.props

    return (
      <div className='pt-card pt-elevation-1 video-info skeleton'>
        {videoInfo ? this.renderVideoInfo() : this.renderSkeletonContent()}
      </div>
    )
  }

  renderVideoInfo () {
    const { videoInfo } = this.props
    const { descriptionExpanded } = this.state
    return (
      <Flex justify='flex-start' style={{ width: '100%' }}>
        <Box className='video-thumb-box'>
          <a target='_blank' href={`https://www.youtube.com/watch?v=${videoInfo.get('videoId')}`}>
            <img width='246' height='138' src={videoInfo.get('thumbnailUrl')} />
          </a>
        </Box>
        <Box className='video-info-box' auto>
          <h4>
            <a target='_blank' href={`https://www.youtube.com/watch?v=${videoInfo.get('videoId')}`}>
              {videoInfo.get('title')}
            </a>
          </h4>
          <p className='video-info-item video-info-publish'>
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
          <p className='video-info-item video-info-counts'>
            <strong>
              {videoInfo.get('views').toLocaleString()}
            </strong>
            &nbsp;Views &bull;&nbsp;
            <strong>
              {videoInfo.get('commentCount').toLocaleString()}
            </strong>
            &nbsp;Comments
          </p>
          <p
            className={`video-description ${descriptionExpanded && 'expanded'}`}
            dangerouslySetInnerHTML={{ __html: videoInfo.get('description') }} />
          <hr />
          <div className='expand-description'>
            <a onClick={this.toggleExpandDescription}>Show {descriptionExpanded ? 'Less' : 'More'}</a>
          </div>
        </Box>
      </Flex>
    )
  }

  renderSkeletonContent () {
    return (
      <Flex justify='flex-start' style={{ width: '100%' }}>
        <Box className='video-thumb-box'>
          <div className='pt-skeleton' style={{ width: '246px', height: '138px', margin: '0 auto' }} />
        </Box>
        <Box className='video-info-box' px={2} auto>
          <h2 className='pt-skeleton'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <p className='pt-skeleton'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p className='pt-skeleton'>Lorem ipsum dolor sit amet</p>
          <p className='pt-skeleton'>Lorem ipsum dolor sit amet</p>
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
