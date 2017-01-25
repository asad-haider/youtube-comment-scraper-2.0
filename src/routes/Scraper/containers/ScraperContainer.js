import { connect } from 'react-redux'
import * as scraperActions from '../redux/Scraper/actions'
import * as resultEditorActions from '../redux/ResultEditor/actions'
import Scraper from '../components/Scraper'

const mapStateToProps = (state, ownProps) => ({
  videoId: ownProps.params.videoId,
  scraper: state.scraper,
  resultEditor: state.resultEditor,
  router: ownProps.router,
  route: ownProps.route
})

// when passing an actions object, all props are automatically wrapped in dispatch
const mapDispatchToProps = { ...scraperActions, ...resultEditorActions }

export default connect(mapStateToProps, mapDispatchToProps)(Scraper)
