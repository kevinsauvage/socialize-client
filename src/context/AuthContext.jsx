import { createContext } from 'react'
import { useLocalStorage } from './../hooks/useLocalStorage'
import { urls } from './../ApiCall/apiUrl'
import { fetchUrl } from './../helpers/fetch'

export const AuthContext = createContext()

const { Provider } = AuthContext

export const AuthProvider = (props) => {
  const [storedUser, setStoredUser] = useLocalStorage('user')

  const login = async (formData, callback) => {
    try {
      const response = await fetchUrl(urls.login, {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      if (response.status === 200) {
        const data = await response.json()
        setStoredUser(JSON.stringify(data))
        callback()
        return data
      } else {
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }

  const register = async (formData, callback) => {
    try {
      const response = await fetchUrl(urls.register, {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      if (response.status === 200) {
        callback()
        return response.json()
      } else {
        return response
      }
    } catch (e) {
      console.log(e)
    }
  }

  const value = { login, storedUser, register }

  return <Provider value={value}>{props.children}</Provider>
}
