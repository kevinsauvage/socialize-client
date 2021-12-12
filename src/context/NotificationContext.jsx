import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { fetchUrl } from '../helpers/fetch'
import { AuthContext } from './AuthContext'

export const NotificationContext = createContext()

const { Provider } = NotificationContext

export const NotificationProvider = (props) => {
  const { user, token } = useContext(AuthContext)
  const [userNotification, setUserNotification] = useState([])
  const [count, setCount] = useState(0)
  const [limit, setLimit] = useState(5)

  const getUserNotification = useCallback(async () => {
    if (!token) return
    const res = await fetchUrl(
      `notification/${user._id}?limit=${limit}`,
      {
        method: 'Get',
      },
      token,
    )
    const data = await res.json()
    data.count && setCount(data.count)
    data.data && setUserNotification(data.data)
    return
  }, [user, token, limit])

  useEffect(() => {
    const interval = setInterval(() => getUserNotification(), 10000)
    return () => clearInterval(interval)
  }, [getUserNotification])

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
    limit,
    setLimit,
  }

  return <Provider value={value}>{props.children}</Provider>
}
