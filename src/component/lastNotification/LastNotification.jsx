import BlocTitle from '../blocTitle/BlocTitle'
import './LastNotification.scss'
import Notification from './../notification/Notification'

const LastNotification = () => {
  return (
    <div className="lastNotification">
      <BlocTitle text="Last Notifications" />
      <Notification />
      <Notification />
      <Notification />
      <Notification />
    </div>
  )
}

export default LastNotification
