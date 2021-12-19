export const setValue = (key, value, ttl) => {
  try {
    const expiryTime = Date.now() + ttl * 1000

    const item = {
      value: value,
      expiry: expiryTime,
    }

    return localStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    console.log(error)
  }
}

export const getValue = (key) => {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) return null

  const item = JSON.parse(itemStr)

  const now = Date.now()

  const isNotValid = Math.floor(now) > Math.floor(item.expiry)

  if (isNotValid) {
    localStorage.removeItem(key)
    return null
  }

  return item.value
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
