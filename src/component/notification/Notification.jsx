import './Notification.scss'
import { FiExternalLink } from 'react-icons/fi'

const Notification = () => {
  return (
    <div className="notification">
      <div className="notification__details">
        <p>Jhon thulis commented your photo</p>
        <i>10 hours Ago</i>
      </div>
      <FiExternalLink className="notification__btn" />
    </div>
  )
}

export default Notification
