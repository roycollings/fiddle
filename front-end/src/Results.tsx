import React, { memo } from 'react'

const hasData = (data: object[]) => JSON.stringify(data) !== '[]'

const buildResults = (result: object[]) =>
  hasData(result || [])
    ? result.map((item: object, i: number) => (
        <li key={i}>{JSON.stringify(item)}</li>
      ))
    : 'No results'

const Results = (props: any) => {
  const { data } = props

  const totalResults = (data.result || []).length
  const total = totalResults > 0 ? `TOTAL: ${totalResults}` : ''

  // TODO: new component to display results and include a bookmark checkbox.
  // TODO: pagination.
  const results = buildResults(data.result)

  return (
    <div>
      <div aria-label="Total results">{total}</div>
      <div aria-label="Search results">
        <ul>{results}</ul>
      </div>
    </div>
  )
}

// Using 'memo' to avoid re-render when nothing changed.
export default memo(Results)
