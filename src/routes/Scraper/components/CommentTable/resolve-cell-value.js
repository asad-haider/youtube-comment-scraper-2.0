export default function ({ data, rowIndex, columnKey }) {
  const entity = data.rows.get(rowIndex)

  if (!entity) {
    console.warn('No row with index', rowIndex)
    return ''
  }

  return entity.get(columnKey)
}
