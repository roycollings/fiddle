import { RequestParams, Method } from './types'
import { API_URL } from "./config"

/**
 * Abstracted here to allow us to swap out fetch for axios etc... and give a central place to build
 * requests.
 * 
 * @param options params for the request
 * @returns the response from the request
 */
export const request = async (options: RequestParams) => {
  const { endpoint, params, method, body } = options;

  const parsedEndpoint = endpoint.replace(/^\//, '')
  const parsedPparams = params ? `?${params}` : ''
  const url = `${API_URL}/${parsedEndpoint}${parsedPparams}`

  return await fetch(url, {
    method: method || Method.get,
    body
  })
}
