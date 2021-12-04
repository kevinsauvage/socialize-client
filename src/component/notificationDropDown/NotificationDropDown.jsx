import './NotificationDropDown.scss'
import { useCallback, useContext, useEffect } from 'react'
import Notification from '../notification/Notification'
import { NotificationContext } from '../../context/NotificationContext'

const NotificationDropDown = ({ limit, setLimit }) => {
  const {
    userNotification,
    updateNotification,
    getUserNotification,
    count,
  } = useContext(NotificationContext)

  const handleLoadMore = () => {
    limit && setLimit(limit + 5)
  }

  const handleChangeNotiStatus = useCallback(
    async (limit) => {
      await userNotification.forEach((noti) => {
        if (noti.consulted === false) {
          updateNotification(noti._id, { consulted: true })
          getUserNotification(limit)
        }
      })
    },
    [updateNotification, userNotification, getUserNotification],
  )

  useEffect(() => {
    if (!userNotification) return
    handleChangeNotiStatus(limit)
  }, [handleChangeNotiStatus, userNotification, limit])

  console.log(count, limit)

  return (
    <div className="NotificationDropDown">
      <ul className="NotificationDropDown__list">
        {userNotification.map((noti) => (
          <Notification key={noti._id} item={noti} />
        ))}
        {count > limit && (
          <div
            className="NotificationDropDown__loadMore"
            onClick={handleLoadMore}
          >
            <p>Load More</p>
          </div>
        )}
      </ul>
    </div>
  )
}

export default NotificationDropDown
