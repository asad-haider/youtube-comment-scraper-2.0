import { List, Map } from 'immutable'

export default function updateRows ({ resultEditor, comments }, override = {}) {
  const includeReplies = override.includeReplies == null
    ? resultEditor.get('includeReplies')
    : override.includeReplies

  if (!includeReplies) {
    return comments.map(c => Map({ commentId: c.get('id') }))
  } else {
    return comments.reduce((cs, c) =>
      cs.concat(List.of(Map({ commentId: c.get('id') })))
        .concat(c.get('hasReplies')
          ? c.get('replies').map(rId => Map({ replyId: rId }))
          : List()),
      List())
  }
}
