import { createContext, useCallback, useContext, useState } from 'react'
import { fetchUrl } from '../helpers/fetch'
import { AuthContext } from './AuthContext'

export const NotificationContext = createContext()

const { Provider } = NotificationContext

export const NotificationProvider = (props) => {
  const { user, token } = useContext(AuthContext)
  const [userNotification, setUserNotification] = useState([])
  const [count, setCount] = useState(0)

  const getUserNotification = useCallback(
    async (limit) => {
      if (!token) return
      const res = await fetchUrl(
        `notification/${user._id}?limit=${limit}`,
        {
          method: 'Get',
        },
        token,
      )
      const data = await res.json()
      console.log(data)
      setCount(data.count)
      setUserNotification(data.data)
      return
    },
    [user, token],
  )

  const updateNotification = async (id, body) => {
    return await fetchUrl(
      `notification/${id}`,
      {
        method: 'put',
        body: JSON.stringify(body),
      },
      token,
    )
  }

  const value = {
    updateNotification,
    getUserNotification,
    userNotification,
    count,
  }

  return <Provider value={value}>{props.children}</Provider>
}
