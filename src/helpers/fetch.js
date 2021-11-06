import { urls } from './../ApiCall/apiUrl'

export const fetchUrl = async (url, option) => {
  return await fetch(urls.baseUrl + url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...option,
  })
}
