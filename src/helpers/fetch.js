import { urls } from './../ApiCall/apiUrl'

export const fetchUrl = async (url, option, token, signal) => {
  return await fetch(urls.baseUrl + url, {
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
    },
    ...option,
    signal: signal && signal,
  })
}
