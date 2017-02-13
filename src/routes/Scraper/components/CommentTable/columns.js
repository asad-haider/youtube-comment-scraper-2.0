import DefaultCell from './DefaultCell'
import BooleanCell from './BooleanCell'
import TextCell from './TextCell'

export default [
  {
    key: 'id',
    name: 'ID',
    width: 250
  },
  {
    key: 'author',
    name: 'Author',
    width: 150
  },
  {
    key: 'authorLink',
    name: 'Author Link',
    width: 150
  },
  {
    key: 'authorThumb',
    name: 'Author Thumb',
    width: 150
  },
  {
    key: 'text',
    name: 'Text',
    width: 300,
    cell: TextCell
  },
  {
    key: 'likes',
    name: 'Likes',
    width: 50
  },
  {
    key: 'time',
    name: 'Time',
    width: 130
  },
  {
    key: 'timestamp',
    name: 'Timestamp',
    width: 120
  },
  {
    key: 'edited',
    name: 'Edited',
    width: 60,
    resizable: true,
    cell: BooleanCell
  },
  {
    key: 'hasReplies',
    name: 'Has Replies',
    width: 85,
    cell: BooleanCell
  },
  {
    key: 'reply_id',
    name: 'Reply ID',
    width: 250,
    resizable: true
  },
  {
    key: 'reply_author',
    name: 'Reply Author',
    width: 150
  },
  {
    key: 'reply_authorLink',
    name: 'Reply Author Link',
    width: 150
  },
  {
    key: 'reply_authorThumb',
    name: 'Reply Author Thumb',
    width: 150
  },
  {
    key: 'reply_text',
    name: 'Reply Text',
    width: 300,
    cell: TextCell
  },
  {
    key: 'reply_likes',
    name: 'Reply Likes',
    width: 80
  },
  {
    key: 'reply_time',
    name: 'Reply Time',
    width: 130
  },
  {
    key: 'reply_timestamp',
    name: 'Reply Timestamp',
    width: 120
  },
  {
    key: 'reply_edited',
    name: 'Reply Edited',
    width: 90,
    resizable: true,
    cell: BooleanCell
  }
].map(c => ({ resizable: true, cell: DefaultCell, ...c }))
