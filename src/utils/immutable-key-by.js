import { Map } from 'immutable'

export default function keyBy (list, field) {
  return list.reduce((map, x) => map.set(x.get(field), x), Map())
}
