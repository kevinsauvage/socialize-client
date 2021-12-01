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
    async (id) => {
      try {
        const response = await fetchUrl(
          `users/${id}`,
          { method: 'GET' },
          user.token,
        )
        const json = await response.json()
        return json
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

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
    localStorage.removeItem('user')
    localStorage.clear()
    setUser(undefined)
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
          user.token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user],
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
          user.token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

  const searchUsers = useCallback(
    async (query) => {
      try {
        return await fetchUrl(
          `search?query=${query}`,
          {
            method: 'GET',
          },
          user.token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user],
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
          user.token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

  const handleUnfriend = useCallback(
    async (friend, callback) => {
      try {
        return await fetchUrl(
          `users/${user._id}/unfriends/${friend._id}`,
          {
            method: 'PUT',
          },
          user.token,
        )
      } catch (error) {
        console.log(error)
      } finally {
        callback && callback()
      }
    },
    [user],
  )

  const handleAddFriend = useCallback(
    async (friend, callback) => {
      try {
        return await fetchUrl(
          `users/${user._id}/sendAddfriends/${friend._id}`,
          {
            method: 'PUT',
          },
          user.token,
        )
      } catch (error) {
        console.log(error)
      } finally {
        callback && callback()
      }
    },
    [user],
  )

  const handleUnsedFriendRequest = useCallback(
    async (friend, callback) => {
      try {
        const res = await fetchUrl(
          `users/${user._id}/unsendAddfriends/${friend._id}`,
          {
            method: 'PUT',
          },
          user.token,
        )
        callback && callback()
        return res
      } catch (error) {
        console.log(error)
      }
    },
    [user],
  )

  const handleAcceptFriend = useCallback(
    async (friend) => {
      try {
        return await fetchUrl(
          `users/${user._id}/acceptfriend/${friend._id}`,
          {
            method: 'PUT',
          },
          user.token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user],
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
          user.token,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [user],
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
  }

  return <Provider value={value}>{props.children}</Provider>
}
