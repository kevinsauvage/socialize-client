import { useEffect, useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue)

  const setValue = (value) => {
    window.localStorage.setItem(key, value)
    setStoredValue(value)
  }

  useEffect(() => {
    const value = window.localStorage.getItem(key)
    if (value) {
      setStoredValue(JSON.parse(value))
    }
  }, [key])

  return [storedValue, setValue]
}
