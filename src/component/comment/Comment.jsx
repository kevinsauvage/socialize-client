import { getDataFromTimestamp } from '../../helpers/getDataFromTimestamp'
import Avatar from '../avatar/Avatar'
import './Comment.scss'

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <Avatar />
      <div className="comment__content">
        <div className="comment__wrapper">
          <div className="comment__detail">
            <h5>{comment?.authorName}</h5>
            <i className="comment__published">
              {getDataFromTimestamp(comment.createdAt)}
            </i>
          </div>
          <div className="comment__text">
            <p>{comment?.body}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
