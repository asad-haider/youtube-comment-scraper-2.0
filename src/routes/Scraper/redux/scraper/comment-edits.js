import { List } from 'immutable'

const filterFields = fields => c =>
  c.filter((_, f) => fields.includes(f))

const isReplyField = f =>
  /^reply_/.test(f)

const stripReplyPrefix = f =>
  f.replace(/^reply_/, '')

export function applyColumnEdits (comments, resultEditor) {
  const activeCommentFields = resultEditor.get('columns')
    .toList()
    .filter(c => c.get('display'))
    .map(c => c.get('key'))
    .concat(resultEditor.get('includeReplies') ? List.of('replies') : List())

  const activeReplyFields = activeCommentFields
    .filter(f => resultEditor.get('repliesCollapsed') ? !isReplyField(f) : isReplyField(f))
    .map(stripReplyPrefix)

  const filterCommentFields = filterFields(activeCommentFields)
  const filterReplyFields = filterFields(activeReplyFields)

  return comments
    .map(filterCommentFields)
    .map(c => c.get('replies')
      ? c.update('replies', rs => rs.map(filterReplyFields))
      : c)
}

export function applyReplyEdits (comments, resultEditor) {
  return (!resultEditor.get('includeReplies'))
    ? comments
    : (!resultEditor.get('repliesCollapsed'))
    ? comments.reduce((cs, c) => cs.concat(flattenReplies(c)), List())
    : comments.reduce((cs, c) => cs.concat(collapseReplies(c)), List())
}

function flattenReplies (c) {
  if (!c.get('replies')) {
    return List.of(c)
  }

  const replies = c.get('replies').map(r => r.mapKeys(k => `reply_${k}`))
  return List.of(c).concat(replies)
}

function collapseReplies (c) {
  return (!c.get('replies'))
    ? List.of(c)
    : List.of(c.filter((_, k) => k !== 'replies'))
        .concat(c.get('replies'))
}
