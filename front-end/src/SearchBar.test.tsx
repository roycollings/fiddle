import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

const mock = {
  MockResults: jest.fn(props => ({
    default: () => {
      return <div></div>
    }
  })),
  mockRequest: () =>
    jest.fn((...args) => ({
      headers: { a: 1 },
      status: 200,
      body: { success: true },
      json: () => Promise.resolve({ data: [1, 2, 3] })
    }))()
}

jest.mock('./Results.tsx', () => (props: any) => mock.MockResults(props))
jest.mock('./api/request', () => ({
  request: (...args: any) => mock.mockRequest()
}))

beforeEach(() => {
  mock.MockResults.mockClear()
})

test('renders', () => {
  render(<SearchBar />)
  const component = screen.getByText(/Search/i)
  expect(component).toBeInTheDocument()
})

test('has a search input field', () => {
  render(<SearchBar />)
  const component = screen.getByPlaceholderText('Enter search term')

  expect(component).toBeInTheDocument()
})

test('has a search button', () => {
  render(<SearchBar />)
  const component = screen.getByRole('button', { name: /Search/i })

  expect(component).toBeInTheDocument()
})

test('search button disabled when no search string', () => {
  render(<SearchBar />)

  expect(screen.getByRole('button', { name: /Search/i })).toHaveAttribute(
    'disabled'
  )
})

test('search button enabled when search string', async () => {
  render(<SearchBar />)

  await userEvent.type(
    screen.getByPlaceholderText('Enter search term'),
    'smoking'
  )

  expect(screen.getByRole('button', { name: /Search/i })).not.toHaveAttribute(
    'disabled'
  )
})

test('results are not displayed initially', () => {
  render(<SearchBar />)

  expect(screen.getByTestId('results').innerHTML).toBe('')
})

test('shows "searching" text', async () => {
  render(<SearchBar />)

  await userEvent.type(
    screen.getByPlaceholderText('Enter search term'),
    'smoking'
  )

  await userEvent.click(screen.getByRole('button', { name: /Search/i }))

  await waitFor(() => {
    expect(screen.getByText(/searching/i)).toBeInTheDocument()
  })
})

test('shows results if found', async () => {
  render(<SearchBar />)

  await userEvent.type(
    screen.getByPlaceholderText('Enter search term'),
    'smoking'
  )

  await userEvent.click(screen.getByRole('button', { name: /Search/i }))

  await waitFor(() => {
    expect(mock.MockResults).toBeCalledWith({ data: [1, 2, 3] })
  })
})
