import BooleanColumnFormatter from './BooleanColumnFormatter'
import TextColumnFormatter from './TextColumnFormatter'

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
    formatter: TextColumnFormatter
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
    formatter: BooleanColumnFormatter
  },
  {
    key: 'hasReplies',
    name: 'Has Replies',
    width: 85,
    formatter: BooleanColumnFormatter
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
    formatter: TextColumnFormatter
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
    width: 60,
    resizable: true,
    formatter: BooleanColumnFormatter
  }
].map(c => ({ resizable: true, ...c }))
