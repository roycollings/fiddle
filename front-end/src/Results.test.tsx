import React from 'react'
import { render, screen } from '@testing-library/react'
import Results from './Results'
import { data } from './Results.fixture.json'

test('displays no results initially', () => {
  render(<Results data={{}} />)
  const expectedText = screen.getByText(/No results/i)
  expect(expectedText).toBeInTheDocument()
})

test('renders results', () => {
  render(<Results data={data} />)
  const items = screen.getAllByText(/influenza/i)
  expect(items).toHaveLength(2)
})

test('displays total', () => {
  render(<Results data={data} />)
  const linkElement = screen.getByText(/TOTAL.* 14$/i)
  expect(linkElement).toBeInTheDocument()
})
