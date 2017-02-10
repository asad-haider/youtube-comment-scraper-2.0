import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import mapValues from 'lodash/mapValues'
import actions from '../redux/actions'
import Scraper from '../components/Scraper'

const mapStateToProps = (state, ownProps) => ({
  videoId: ownProps.params.videoId,
  comments: state.comments,
  replies: state.replies,
  resultEditor: state.resultEditor,
  scraper: state.scraper,
  videoInfo: state.videoInfo,
  router: ownProps.router,
  route: ownProps.route
})

const bindActions = dispatch => action =>
  bindActionCreators(action, dispatch)

// wrap all action creators with the dispatch function
const mapDispatchToProps = dispatch => {
  const bind = bindActions(dispatch)
  return {
    actions: mapValues(actions, bind)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scraper)
