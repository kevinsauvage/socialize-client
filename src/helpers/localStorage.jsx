export const setValue = (key, value) => {
  window.localStorage.setItem(key, value)
}

export const getValue = (key) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
