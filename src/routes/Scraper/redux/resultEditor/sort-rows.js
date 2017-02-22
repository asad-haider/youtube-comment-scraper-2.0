const findById = (list, id) =>
  list.find(e => e.get('id') === id)

const findAnyEntity = (ref, comments, replies) =>
  ref.get('commentId')
    ? findById(comments, ref.get('commentId'))
    : ref.get('replyId')
    ? findById(replies, ref.get('replyid'))
    : null

const compare = ({ comparator, sortKey, comments, replies, repliesCollapsed }) => (a, b) => {
  let aEntity, bEntity

  if (repliesCollapsed) {
    aEntity = findAnyEntity(a, comments, replies)
    bEntity = findAnyEntity(b, comments, replies)
  } else if (a.get('commentId')) {
    if (!b.get('commentId')) {
      return 1
    }
    aEntity = findById(comments, a.get('commentId'))
    bEntity = findById(comments, b.get('commentId'))
  } else if (a.get('replyId')) {
    if (!b.get('replyId')) {
      return 1
    }
    aEntity = findById(replies, a.get('replyId'))
    bEntity = findById(replies, b.get('replyId'))
  }

  if (aEntity && bEntity) {
    console.log('comparing', sortKey, aEntity.get(sortKey), bEntity.get(sortKey), comparator(aEntity.get(sortKey), bEntity.get(sortKey)))
  }

  return (!aEntity || !bEntity)
      ? 1
      : comparator(aEntity.get(sortKey), bEntity.get(sortKey))
}

const defaultComparator = (a, b) => {
  return (a > b)
    ? 1
    : (a < b)
    ? -1
    : 0
}

const comparator = ({ sortKey, comments, replies, sortDir, repliesCollapsed }) => {
  switch (sortKey) {
    default:
      return compare({ comparator: defaultComparator, sortKey, comments, replies, repliesCollapsed })
  }
}

export default function ({ rows, sortKey, comments, replies, sortDir, repliesCollapsed }) {
  console.log(rows, sortKey, comments, replies, sortDir, repliesCollapsed)
  return rows.sort(comparator({ sortKey, comments, replies, sortDir, repliesCollapsed }))
}
