export default function ({ data, rowIndex, columnKey }) {
  const { comments, replies, rows, repliesCollapsed } = data
  if (!comments || !replies || !rows) {
    console.warn(`Cannot find data for #${rowIndex} . ${columnKey}`)
    return ''
  }

  const row = rows.get(rowIndex)
  if (!row) {
    console.warn(`No row #${rowIndex}`)
    return ''
  }

  if (!row.get('commentId') && !row.get('replyId')) {
    console.warn(`Row #${rowIndex} does not have a comment or reply id`, row.toJS())
    return ''
  }

  const { commentId, replyId } = row.toObject()

  const entity = replyId
    ? replies.get(replyId)
    : comments.get(commentId)

  if (!entity) {
    console.warn(`No data with id ${commentId || replyId}`)
    console.log(replies.toJS())
    return ''
  }

  if (replyId && !/reply_/i.test(columnKey) && !repliesCollapsed) {
    return ''
  }

  const entityKey = repliesCollapsed
    ? columnKey.replace(/^reply_/i, '')
    : /^reply_/i.test(columnKey) && replyId
    ? columnKey.replace(/^reply_/i, '')
    : columnKey

  return entity.get(entityKey)
}
