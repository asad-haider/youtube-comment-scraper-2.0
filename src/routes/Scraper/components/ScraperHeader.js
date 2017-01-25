import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { Flex, Box } from 'reflexbox'
import VideoInfo from './VideoInfo'

import './ScraperHeader.scss'

class ScraperHeader extends Component {
  displayName: 'ScraperHeader'
  propTypes: {
    videoInfo: PropTypes.object
  }
  defaultProps: {}

  render () {
    const { videoInfo } = this.props

    return (
      <Flex className='scraper-header' align='stretch'>
        <Box className='scraper-header-logo-container'>
          <Flex column justify='space-around' align='center'>
            <IndexLink to='/'>
              <Box><span className='logo pt-icon-comment' /></Box>
            </IndexLink>
          </Flex>
        </Box>
        <Box p={1} className='scraper-header-main' auto>
          <VideoInfo videoInfo={videoInfo} />
        </Box>
      </Flex>
    )
  }
}

export default ScraperHeader
