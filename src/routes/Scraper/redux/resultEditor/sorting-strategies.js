function defaultSort (a, b) {
  return (a > b)
    ? 1
    : (a < b)
    ? -1
    : 0
}

const sortStrategies = {

}

export default function (columnKey) {
  return sortStrategies(columnKey) || defaultSort
}
