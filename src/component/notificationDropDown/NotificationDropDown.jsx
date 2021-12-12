import './NotificationDropDown.scss'
import { useCallback, useContext, useEffect, useRef } from 'react'
import Notification from '../notification/Notification'
import { NotificationContext } from '../../context/NotificationContext'
import { useClickOutside } from '../../hooks/useClickOutside'

const NotificationDropDown = ({ handleClose }) => {
  const {
    userNotification,
    updateNotification,
    getUserNotification,
    count,
    limit,
    setLimit,
  } = useContext(NotificationContext)

  const handleLoadMore = () => {
    setLimit(limit + 5)
    getUserNotification()
  }

  const dropDown = useRef(null)

  const handleChangeNotiStatus = useCallback(async () => {
    await userNotification.forEach((noti) => {
      if (noti && noti.consulted === false) {
        updateNotification(noti._id, { consulted: true })
        getUserNotification()
      }
    })
  }, [updateNotification, userNotification, getUserNotification])

  useEffect(() => {
    if (!userNotification) return
    handleChangeNotiStatus()
  }, [handleChangeNotiStatus, userNotification])

  useClickOutside(dropDown, handleClose)

  return (
    <div className="NotificationDropDown" ref={dropDown}>
      <ul className="NotificationDropDown__list">
        {userNotification.map((noti) => (
          <Notification key={noti._id} item={noti} />
        ))}
        <div
          className={`NotificationDropDown__loadMore ${
            count < limit && 'NotificationDropDown__loadMore--inactive'
          }`}
          onClick={handleLoadMore}
        >
          <p>Load More</p>
        </div>
      </ul>
    </div>
  )
}

export default NotificationDropDown
