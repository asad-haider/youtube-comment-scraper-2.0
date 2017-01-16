import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import Scraper from '../components/Scraper'

const mapStateToProps = (state, { params }) => ({
  videoId: params.videoId,
  comments: state.scraper.get('comments')
})

// when passing an actions object, all props are automatically wrapped in dispatch
const mapDispatchToProps = { ...actions }

export default connect(mapStateToProps, mapDispatchToProps)(Scraper)
