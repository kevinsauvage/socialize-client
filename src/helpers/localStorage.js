export const getStorage = (item) => {
  const data = localStorage.getItem(item)
  return data ? data : undefined
}
export const removeStorage = (item) => {
  localStorage.removeItem(item)
}
