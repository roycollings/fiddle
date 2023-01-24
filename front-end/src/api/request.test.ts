import { request } from "./request"
import { API_URL } from "./config"
import { Method } from "./types";

const mockFetch = () => global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks()
  mockFetch()
})

it("sends a single request to 'fetch'", async () => {
  await request({ endpoint: "search" });

  expect(global.fetch).toHaveBeenCalledTimes(1)
})

it("adds 'endpoint' to the request", async () => {
  await request({ endpoint: "search" });

  expect(global.fetch).toHaveBeenCalledWith(
    `${API_URL}/search`,
    { body: undefined, method: "get" }
  )
})

it("allows 'endpoint' to have a leading '/'", async () => {
  await request({ endpoint: "/search", });

  expect(global.fetch).toHaveBeenCalledWith(
    `${API_URL}/search`,
    { body: undefined, method: "get" }
  )
})

it("adds optional 'params' to the request", async () => {
  await request({ endpoint: "search", params: "a=1&b=2" });

  expect(global.fetch).toHaveBeenCalledWith(
    `${API_URL}/search?a=1&b=2`,
    { body: undefined, method: "get" }
  )
})

it("adds optional 'body' to the request", async () => {
  const body = JSON.stringify({ a: 1, b: 2 })
  await request({ endpoint: "search", body });

  expect(global.fetch).toHaveBeenCalledWith(
    `${API_URL}/search`,
    { body, method: "get" }
  )
})

it("allows 'method' to be set", async () => {
  await request({ endpoint: "search", method: Method.post });

  expect(global.fetch).toHaveBeenCalledWith(
    `${API_URL}/search`,
    { body: undefined, method: Method.post }
  )
})