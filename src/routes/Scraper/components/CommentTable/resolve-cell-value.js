export default function ({ data, rowIndex, columnKey }) {
  const { comments, rows } = data
  if (!comments || !rows) {
    console.warn(`Cannot find data for #${rowIndex} . ${columnKey}`)
    return ''
  }

  const commentId = rows.get(rowIndex)
  if (!commentId) {
    console.warn(`No data for row #${rowIndex}`)
    return ''
  }

  const comment = comments.get(commentId)
  if (!comment) {
    console.warn(`No comment with id ${commentId}`)
  }

  return comment.get(columnKey)
}
