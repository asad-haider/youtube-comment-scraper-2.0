import { connect } from 'react-redux'

import Scraper from '../components/Scraper'

const mapDispatchToProps = {}

const mapStateToProps = (state, { params }) => ({
  videoId: params.videoId
})

export default connect(mapStateToProps, mapDispatchToProps)(Scraper)
