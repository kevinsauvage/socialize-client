import './Notification.scss'
import { FiExternalLink } from 'react-icons/fi'
import { getElapsedTime } from '../../helpers/getElapsedTime'
import { Link } from 'react-router-dom'

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
        <i>{getElapsedTime(new Date(item.createdAt))}</i>
      </div>
      <div className="notification__btn">
        <Link className="notification__btn" to={`/posts/${item.postId}`}>
          <FiExternalLink />
        </Link>
      </div>
    </div>
  )
}

export default Notification
