import { createContext, useEffect, useState } from 'react'
import { getValue, removeStorage } from '../helpers/localStorage'
import { urls } from './../ApiCall/apiUrl'
import { fetchUrl } from './../helpers/fetch'
import { setValue } from './../helpers/localStorage'

export const AuthContext = createContext()

const { Provider } = AuthContext

export const AuthProvider = (props) => {
  const [user, setUser] = useState()

  useEffect(() => setUser(getValue('user')), [])

  const login = async (formData, callback) => {
    try {
      const response = await fetchUrl(urls.login, {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      if (response.status === 200) {
        const data = await response.json()
        setValue('user', JSON.stringify(data))
        setUser(data)
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

  const logout = () => {
    removeStorage('user')
    window.location.reload()
  }

  const value = { login, register, logout, user }

  return <Provider value={value}>{props.children}</Provider>
}
