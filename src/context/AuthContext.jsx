import { createContext, useCallback, useState } from 'react'
import { getValue } from '../helpers/localStorage'
import { urls } from './../ApiCall/apiUrl'
import { fetchUrl } from './../helpers/fetch'
import { setValue } from './../helpers/localStorage'

export const AuthContext = createContext()

const { Provider } = AuthContext

export const AuthProvider = (props) => {
  const [user, setUser] = useState(getValue('user'))

  const findOne = useCallback(async (id) => {
    try {
      const response = await fetchUrl(`users/${id}`, { method: 'GET' })
      const json = await response.json()
      setUser(json)
      setValue('user', JSON.stringify(json))
      return json
    } catch (error) {
      console.log(error)
    }
  }, [])

  const login = useCallback(async (formData) => {
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
  }, [])

  const register = useCallback(async (formData) => {
    try {
      return await fetchUrl(urls.register, {
        method: 'POST',
        body: JSON.stringify(formData),
      })
    } catch (e) {
      console.log(e)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.clear()
    setUser(undefined)
    window.location.pathname = '/login'
  }, [])

  const updateUser = useCallback(
    async (form) => {
      try {
        return await fetchUrl(`users/${user._id}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        })
      } catch (error) {
        console.log(error)
      } finally {
        findOne(user._id)
      }
    },
    [findOne, user],
  )

  const updateUserPassword = useCallback(
    async (formData) => {
      try {
        return await fetchUrl(`users/${user?._id}/password`, {
          method: 'PUT',
          body: JSON.stringify({
            newPassword: formData.newPassword,
            oldPassword: formData.oldPassword,
          }),
        })
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

  const searchUsers = useCallback(async (query) => {
    try {
      return await fetchUrl(`search?query=${query}`, {
        method: 'GET',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const searchByIds = useCallback(async (ids) => {
    try {
      return await fetchUrl('searchByIds', {
        method: 'POST',
        body: JSON.stringify(ids),
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleUnfriend = useCallback(
    async (friend, callback) => {
      try {
        return await fetchUrl(`users/${user._id}/unfriends/${friend._id}`, {
          method: 'PUT',
        })
      } catch (error) {
        console.log(error)
      } finally {
        findOne(user._id)
        callback && callback()
      }
    },
    [findOne, user],
  )

  const handleAddFriend = useCallback(
    async (friend, callback) => {
      try {
        return await fetchUrl(
          `users/${user._id}/sendAddfriends/${friend._id}`,
          {
            method: 'PUT',
          },
        )
      } catch (error) {
        console.log(error)
      } finally {
        findOne(user._id)
        callback && callback()
      }
    },
    [findOne, user],
  )

  const handleUnsedFriendRequest = useCallback(
    async (friend, callback) => {
      try {
        return await fetchUrl(
          `users/${user._id}/unsendAddfriends/${friend._id}`,
          {
            method: 'PUT',
          },
        )
      } catch (error) {
        console.log(error)
      } finally {
        findOne(user._id)
        callback && callback()
      }
    },
    [findOne, user],
  )

  const handleAcceptFriend = useCallback(
    async (friend) => {
      try {
        return await fetchUrl(`users/${user._id}/acceptfriend/${friend._id}`, {
          method: 'PUT',
        })
      } catch (error) {
        console.log(error)
      } finally {
        findOne(user._id)
      }
    },
    [findOne, user],
  )

  const findUsers = useCallback(async (array) => {
    try {
      return await fetchUrl('users/find', {
        method: 'POST',
        body: JSON.stringify({ userFriends: array }),
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

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
