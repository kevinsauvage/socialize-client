import { createContext, useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getValue } from '../helpers/localStorage'
import { urls } from './../ApiCall/apiUrl'
import { fetchUrl } from './../helpers/fetch'
import { setValue } from './../helpers/localStorage'

export const AuthContext = createContext()

const { Provider } = AuthContext

export const AuthProvider = (props) => {
  const [user, setUser] = useState(getValue('user'))
  const [token, setToken] = useState(getValue('token'))
  const [error, setError] = useState('')
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    const socket = io(urls.baseUrl)
    socket.on('connnection', () => console.log('connected to server'))
    socket.on('user-changed', (newUser) => {
      setValue('user', JSON.stringify(newUser))
      setUser(newUser)
    })
    socket.on('message', (message) => console.log(message))
    socket.on('disconnect', () => console.log('Socket disconnecting'))
  }, [])

  const findOne = useCallback(
    async (id, signal) => {
      try {
        const response = await fetchUrl(
          `users/${id}`,
          { method: 'GET' },
          token,
          signal,
        )
        if (response.ok) {
          const json = await response.json()
          return json
        } else {
          return response
        }
      } catch (error) {
        console.log(error)
      }
    },
    [token],
  )

  const login = useCallback(async (formData) => {
    const response = await fetchUrl(urls.login, {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      setValue('user', JSON.stringify(data))
      setValue('token', JSON.stringify(data.token))
      setToken(data.token)
      setUser(data)
      window.location.pathname = '/'
      return
    } else {
      const error = await response.json()
      setError(error.message)
      return error.message
    }
  }, [])

  const register = useCallback(async (formData) => {
    const res = await fetchUrl(urls.register, {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      window.location.pathname = '/login'
      return
    } else {
      const error = await res.json()
      setError(error.message)
      return
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(undefined)
    setToken(undefined)
    window.location.pathname = '/login'
    window.location.reload(true)
  }, [])

  const updateUser = useCallback(
    async (form) => {
      try {
        return await fetchUrl(
          `users/${user._id}`,
          {
            method: 'PUT',
            body: JSON.stringify(form),
          },
          token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user, token],
  )

  const updateUserPassword = useCallback(
    async (formData) => {
      try {
        return await fetchUrl(
          `users/${user?._id}/password`,
          {
            method: 'PUT',
            body: JSON.stringify({
              newPassword: formData.newPassword,
              oldPassword: formData.oldPassword,
            }),
          },
          token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user, token],
  )

  const searchUsers = useCallback(
    async (query) => {
      try {
        return await fetchUrl(
          `search?query=${query}&limit=${limit}`,
          {
            method: 'GET',
          },
          token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [token, limit],
  )

  const searchByIds = useCallback(
    async (ids) => {
      try {
        return await fetchUrl(
          'searchByIds',
          {
            method: 'POST',
            body: JSON.stringify(ids),
          },
          token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [token],
  )

  const handleUnfriend = useCallback(
    async (friend, callback) => {
      try {
        return await fetchUrl(
          `users/${user._id}/unfriends/${friend._id}`,
          {
            method: 'PUT',
          },
          token,
        )
      } catch (error) {
        console.log(error)
      } finally {
        console.log('callback')
        callback && callback()
      }
    },
    [token, user],
  )

  const handleAddFriend = useCallback(
    async (friend, callback) => {
      try {
        return await fetchUrl(
          `users/${user._id}/sendAddfriends/${friend._id}`,
          {
            method: 'PUT',
          },
          token,
        )
      } catch (error) {
        console.log(error)
      } finally {
        callback && callback()
      }
    },
    [user, token],
  )

  const handleUnsedFriendRequest = useCallback(
    async (friend, callback) => {
      try {
        const res = await fetchUrl(
          `users/${user._id}/unsendAddfriends/${friend._id}`,
          {
            method: 'PUT',
          },
          token,
        )
        callback && callback()
        return res
      } catch (error) {
        console.log(error)
      }
    },
    [user, token],
  )

  const handleAcceptFriend = useCallback(
    async (friend) => {
      try {
        return await fetchUrl(
          `users/${user._id}/acceptfriend/${friend._id}`,
          {
            method: 'PUT',
          },
          token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user, token],
  )

  const findUsers = useCallback(
    async (array) => {
      try {
        return await fetchUrl(
          'users/find',
          {
            method: 'POST',
            body: JSON.stringify({ userFriends: array }),
          },
          token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [token],
  )

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
    token,
    error,
    setError,
    limit,
    setLimit,
  }

  return <Provider value={value}>{props.children}</Provider>
}
