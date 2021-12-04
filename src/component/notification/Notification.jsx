import './Notification.scss'
import { FiExternalLink } from 'react-icons/fi'
import { getElapsedTime } from '../../helpers/getElapsedTime'

const Notification = ({ item }) => {
  return (
    <div
      className={`notification ${item.consulted && 'notification--consulted'}`}
    >
      <div className="notification__details">
        <p>
          {item.authorName} {item.type === 'Comment' && 'commented'}
          {item.type === 'Like' && 'liked'} your post
        </p>
        <i>{getElapsedTime(item.createdAt)} ago</i>
      </div>
      <FiExternalLink className="notification__btn" />
    </div>
  )
}

export default Notification
