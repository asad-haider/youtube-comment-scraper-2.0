import * as SortDir from './SortDir'
import moment from 'moment'

const compare = ({ comparator, sortKey, sortDir }) => (a, b) => {
  const aVal = a.get(sortKey)
  const bVal = b.get(sortKey)

  if (aVal == null) {
    return 1
  }

  if (bVal == null) {
    return -1
  }

  const res = comparator(aVal, bVal)
  return sortDir === SortDir.ASC ? (-1 * res) : res
}

const stringComparator = (a, b) =>
  a.localeCompare(b)

const buildTime = t => {
  const m = /^(\d+)\s+(\w+)/.exec(t)
  if (!m || m.length !== 3) {
    return null
  }

  return moment().subtract(m[1], m[2])
}

const timeComparator = (a, b) => {
  const m1 = buildTime(a)
  const m2 = buildTime(b)

  if (!m1) {
    return -1
  }

  if (!m2) {
    return 1
  }

  return m1.isAfter(m2)
    ? 1
    : m2.isAfter(m1)
    ? -1
    : 0
}

const timestampComparator = (a, b) => {
  return defaultComparator(a, b) * -1
}

const boolComparator = (a, b) => {
  return a && !b
    ? 1
    : !a && b
    ? -1
    : 0
}

const defaultComparator = (a, b) => {
  return (a > b)
    ? 1
    : (a < b)
    ? -1
    : 0
}

const comparator = ({ sortKey, sortDir }) => {
  switch (sortKey) {
    case 'id':
    case 'reply_id':
    case 'author':
    case 'reply_author':
    case 'authorLink':
    case 'reply_authorLink':
    case 'authorThumb':
    case 'reply_authorThumb':
    case 'text':
    case 'reply_text':
      return compare({ comparator: stringComparator, sortKey, sortDir })

    case 'time':
    case 'reply_time':
      return compare({ comparator: timeComparator, sortKey, sortDir })

    case 'timestamp':
    case 'reply_timestamp':
      return compare({ comparator: timestampComparator, sortKey, sortDir })

    case 'edited':
    case 'reply_edited':
    case 'hasReplies':
      return compare({ comparator: boolComparator, sortKey, sortDir })

    case 'likes':
    case 'reply_likes':
    default:
      return compare({ comparator: defaultComparator, sortKey, sortDir })
  }
}

export default function ({ rows, sortKey, sortDir }) {
  return rows.sort(comparator({ sortKey, sortDir }))
}
