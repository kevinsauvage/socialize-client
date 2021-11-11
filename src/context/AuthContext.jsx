import { createContext, useEffect, useState } from 'react'
import { getValue, removeStorage } from '../helpers/localStorage'
import { urls } from './../ApiCall/apiUrl'
import { fetchUrl } from './../helpers/fetch'
import { setValue } from './../helpers/localStorage'

export const AuthContext = createContext()

const { Provider } = AuthContext

export const AuthProvider = (props) => {
  const [user, setUser] = useState()
  const [userAvatar, setUserAvatar] = useState(undefined)

  useEffect(() => {
    const userSaved = getValue('user')
    userSaved && findOne(userSaved?.id)
  }, [])

  const login = async (formData, callback) => {
    try {
      const response = await fetchUrl(urls.login, {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        setValue('user', JSON.stringify(data))
        setUser(data)
        callback()
      } else {
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }

  const register = async (formData, callback) => {
    try {
      return await fetchUrl(urls.register, {
        method: 'POST',
        body: JSON.stringify(formData),
      })
    } catch (e) {
      console.log(e)
    }
  }

  const logout = () => {
    removeStorage('user')
    window.location.reload()
  }

  const updateUser = async (form) => {
    return await fetchUrl(`users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
    })
  }

  const findOne = async (user) => {
    console.log('caleld')
    const response = await fetchUrl(`users/${user?.id}`, { method: 'GET' })
    const json = await response.json()
    setUserAvatar(json?.image)
    setUser(json)
    return json
  }
  console.log(user)

  const updateUserPassword = async (formData) => {
    return await fetchUrl(`users/${user?.id}/password`, {
      method: 'PUT',
      body: JSON.stringify({
        newPassword: formData.newPassword,
        oldPassword: formData.oldPassword,
      }),
    })
  }

  const value = {
    login,
    register,
    logout,
    user,
    updateUser,
    userAvatar,
    findOne,
    updateUserPassword,
  }

  return <Provider value={value}>{props.children}</Provider>
}
