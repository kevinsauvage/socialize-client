import { createContext, useCallback, useEffect, useState } from 'react'
import { getValue, removeStorage } from '../helpers/localStorage'
import { urls } from './../ApiCall/apiUrl'
import { fetchUrl } from './../helpers/fetch'
import { setValue } from './../helpers/localStorage'

export const AuthContext = createContext()

const { Provider } = AuthContext

export const AuthProvider = (props) => {
  const [user, setUser] = useState()

  const findOne = useCallback(async (id) => {
    const response = await fetchUrl(`users/${id}`, { method: 'GET' })
    const json = await response.json()
    setUser(json)
    setValue('user', JSON.stringify(json))
    return json
  }, [])

  useEffect(() => {
    const userSaved = getValue('user')
    if (userSaved) findOne(userSaved._id)
  }, [findOne])

  const login = async (formData) => {
    try {
      const response = await fetchUrl(urls.login, {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        setValue('user', JSON.stringify(data))
        setUser(data)
        window.location.pathname = '/'
      } else {
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }

  const register = async (formData) => {
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
    localStorage.clear()
    setUser(undefined)
    window.location.pathname = '/login'
  }

  const updateUser = async (form) => {
    const res = await fetchUrl(`users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
    })
    await findOne(user._id)
    return res
  }

  const updateUserPassword = async (formData) => {
    return await fetchUrl(`users/${user?._id}/password`, {
      method: 'PUT',
      body: JSON.stringify({
        newPassword: formData.newPassword,
        oldPassword: formData.oldPassword,
      }),
    })
  }

  const searchUsers = async (query) => {
    return await fetchUrl(`search?query=${query}`, {
      method: 'GET',
    })
  }

  const searchByIds = async (ids) => {
    return await fetchUrl('searchByIds', {
      method: 'POST',
      body: JSON.stringify(ids),
    })
  }

  const handleUnfriend = async (friend, callback) => {
    const res = await fetchUrl(`users/${user._id}/unfriends/${friend._id}`, {
      method: 'PUT',
    })
    await findOne(user._id)
    callback && callback()
    return res
  }

  const handleAddFriend = async (friend, callback) => {
    const res = await fetchUrl(
      `users/${user._id}/sendAddfriends/${friend._id}`,
      {
        method: 'PUT',
      },
    )
    await findOne(user._id)
    callback && callback()
    return res
  }

  const handleUnsedFriendRequest = async (friend, callback) => {
    const res = await fetchUrl(
      `users/${user._id}/unsendAddfriends/${friend._id}`,
      {
        method: 'PUT',
      },
    )
    await findOne(user._id)
    callback && callback()
    return res
  }

  const handleAcceptFriend = async (friend, callback) => {
    const res = await fetchUrl(`users/${user._id}/acceptfriend/${friend._id}`, {
      method: 'PUT',
    })
    await findOne(user._id)
    callback && callback()
    return res
  }

  const findUsers = async (array) => {
    return await fetchUrl('users/find', {
      method: 'POST',
      body: JSON.stringify({ userFriends: array }),
    })
  }

  const value = {
    login,
    register,
    logout,
    user,
    updateUser,
    findOne,
    searchUsers,
    searchByIds,
    updateUserPassword,
    handleAcceptFriend,
    handleUnsedFriendRequest,
    handleAddFriend,
    handleUnfriend,
    findUsers,
  }

  return <Provider value={value}>{props.children}</Provider>
}
