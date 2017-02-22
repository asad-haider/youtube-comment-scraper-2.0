import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import mapValues from 'lodash/mapValues'
import { List } from 'immutable'
import actions from '../redux/actions'
import Scraper from '../components/Scraper'

const buildRows = state => {
  const { comments, replies, resultEditor } = state
  const { includeReplies, repliesCollapsed } = resultEditor.toObject()

  if (!includeReplies) {
    return comments.get('ids')
      .map(cId => comments.getIn(['byId', cId]))
      .filter(Boolean)
  } else {
    return comments.get('ids')
      .reduce((cs, cId) => {
        const c = comments.getIn(['byId', cId])
        return c.get('replies')
          ? cs.concat(
              List.of(c),
              c.get('replies')
                .map(rId => replies.getIn(['byId', rId]))
                .filter(Boolean)
                .map(r => repliesCollapsed ? r : transformToReply(r))
            )
          : cs.concat(List.of(c))
      }, List())
  }
}

const transformToReply = c =>
  c.mapKeys(k => `reply_${k}`)

const mapStateToProps = (state, ownProps) => ({
  videoId: ownProps.params.videoId,
  comments: state.comments,
  replies: state.replies,
  resultEditor: state.resultEditor,
  scraper: state.scraper,
  videoInfo: state.videoInfo,
  router: ownProps.router,
  route: ownProps.route,
  rows: buildRows(state)
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
