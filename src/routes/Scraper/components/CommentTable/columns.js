import React from 'react'
import BooleanColumnFormatter from './BooleanColumnFormatter'
import TextColumnFormatter from './TextColumnFormatter'

export default [
  {
    key: 'id',
    name: 'ID',
    width: 250,
    resizable : true
  },
  {
    key: 'author',
    name: 'Author',
    width: 150,
    resizable : true
  },
  {
    key: 'authorLink',
    name: 'Author Link',
    width: 150,
    resizable : true
  },
  {
    key: 'authorThumb',
    name: 'Author Thumb',
    width: 150,
    resizable : true
  },
  {
    key: 'text',
    name: 'Text',
    width: 300,
    resizable : true,
    formatter: TextColumnFormatter
  },
  {
    key: 'likes',
    name: 'Likes',
    width: 50,
    resizable : true
  },
  {
    key: 'time',
    name: 'Time',
    width: 130,
    resizable : true
  },
  {
    key: 'timestamp',
    name: 'Timestamp',
    width: 120,
    resizable : true
  },
  {
    key: 'hasReplies',
    name: 'Has Replies',
    width: 85,
    resizable : true,
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
    width: 150,
    resizable : true
  },
  {
    key: 'reply_authorLink',
    name: 'Reply Author Link',
    width: 150,
    resizable : true
  },
  {
    key: 'reply_authorThumb',
    name: 'Reply Author Thumb',
    width: 150,
    resizable : true
  },
  {
    key: 'reply_text',
    name: 'Reply Text',
    width: 300,
    resizable : true,
    formatter: TextColumnFormatter
  },
  {
    key: 'reply_likes',
    name: 'Reply Likes',
    width: 80,
    resizable : true
  },
  {
    key: 'reply_time',
    name: 'Reply Time',
    width: 130,
    resizable : true
  },
  {
    key: 'reply_timestamp',
    name: 'Reply Timestamp',
    width: 120,
    resizable : true
  }
]
